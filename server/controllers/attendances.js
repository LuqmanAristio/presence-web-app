import express from 'express';

import { Op } from 'sequelize';

import getAdmin from '../middlewares/getAdmin.js';
import Employee from '../models/employee.js';
import Attendance from '../models/attendance.js';

const router = express.Router();

router.use(getAdmin);

// Get all admin's employees' attendances
router.get('/', async (req, res) => {
    try {
        const attendances = await Attendance.findAll({
            include: [{model: Employee, where: {admin: req.admin.userId}}],
            order: [['time', 'DESC']]
        });
        const pureAttendances = attendances.map(({id, employeeId, time, status, createdAt, updatedAt, Employee}) => (
            {id, employeeId, employeeName: Employee.name, time, day: new Date(time).getDay(), status, createdAt, updatedAt}
        ));
        return res.json(pureAttendances);
    } catch (err) {
        console.log(err.message);
    }
});

// Get recent attendances (1 week)
router.get('/weekly', async (req, res) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 6);
    lastWeek.setHours(0, 0, 0, 0);
    try {
        const attendances = await Attendance.findAll({
            include: [{model: Employee, where: {admin: req.admin.userId}}],
            where: {
                time: {
                    [Op.between]: [lastWeek, today]
                }
            },
            order: [['time', 'DESC']]
        });
        const weekTotals = [7, 6, 5, 4, 3, 2, 1].map(day => {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satrurday', 'Sunday'];
            const dayTotal = attendances.filter(({time}) => new Date(time).getDay() === day);
            return {
                id: day,
                day: days[day - 1],
                userAtt: dayTotal.length
            }
        });
        const todayDay = today.getDay();
        const recentTotals = [...weekTotals.slice(7 - todayDay), ...weekTotals.slice(0, 7 - todayDay)];
        return res.json(recentTotals);
    } catch (err) {
        console.log(err.message);
    }
});

// Get recent attendances (this month)
router.get('/monthly', async (req, res) => {
    const now = new Date();
    const monthBegin = new Date(now);
    monthBegin.setDate(1);
    monthBegin.setHours(0, 0, 0, 0);
    try {
        const attendances = await Attendance.findAll({
            include: [{model: Employee, where: {admin: req.admin.userId}}],
            where: {
                time: {
                    [Op.between]: [monthBegin, now]
                }
            },
            order: [['time', 'DESC']]
        });
        const pureAttendances = attendances.map(({id, employeeId, time, status, createdAt, updatedAt, Employee}) => (
            {id, employeeId, employeeName: Employee.name, time, day: new Date(time).getDay(), status, createdAt, updatedAt}
        ));
        return res.json(pureAttendances);
    } catch (err) {
        console.log(err.message);
    }
});

// Get attendance information
router.get('/info', async (req, res) => {
    const todayBegin = new Date();
    todayBegin.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const now = new Date();
    const monthBegin = new Date(now);
    monthBegin.setDate(1);
    monthBegin.setHours(0, 0, 0, 0);
    try {
        const thisDayAttendances = await Attendance.findAll({
            include: [{model: Employee, where: {admin: req.admin.userId}}],
            where: {
                time: {
                    [Op.between]: [todayBegin, todayEnd]
                }
            }
        });
        const thisMonthAttendances = await Attendance.findAll({
            include: [{model: Employee, where: {admin: req.admin.userId, status: 'active'}}],
            where: {
                time: {
                    [Op.between]: [monthBegin, now]
                }
            }
        });
        const {ontime, late, absent} = {
            ontime: thisDayAttendances.filter(attendance => attendance.status === 'ontime').length,
            late: thisDayAttendances.filter(attendance => attendance.status === 'late').length,
            absent: thisDayAttendances - thisDayAttendances.length
        };

        const activeEmployees = await Employee.findAll({where: {admin: req.admin.userId, status: 'active'}});
        const thisMonthTotalAttendances = activeEmployees.map(employee => {
            const registerDate = new Date(employee.createdAt);
            // Same year
            if(registerDate.getFullYear() === now.getFullYear()) {
                if(registerDate.getMonth() < now.getMonth()) {
                    return now.getDate();
                } else if(registerDate.getMonth() === now.getMonth()) {
                    return now.getDate() - registerDate.getDate() + 1;
                } else {
                    return 0;
                }
            }
            // More than 1 year ago
            return now.getDate();
        }).reduce((total, count) => total + count, 0);
        
        const thisMonthOntimeCount = thisMonthAttendances.filter(attendance => attendance.status === 'ontime').length;
        const thisMonthLateCount = thisMonthAttendances.filter(attendance => attendance.status === 'late').length;
        const ontimePercentage = (thisMonthOntimeCount / thisMonthTotalAttendances) * 100;
        const latePercentage = (thisMonthLateCount / thisMonthTotalAttendances) * 100;

        return res.json({
            todayCount: thisDayAttendances.length,
            monthCount: thisMonthAttendances.length,
            ontime, late, absent,
            ontimePercentage, latePercentage
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Get attendance reports
router.get('/report', getAdmin, async (req, res) => {
    const todayBegin = new Date();
    todayBegin.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 6);
    lastWeek.setHours(0, 0, 0, 0);
    const monthBegin = new Date(now);
    monthBegin.setDate(1);
    monthBegin.setHours(0, 0, 0, 0);

    const range = req.query.range || 'daily';
    try {
        switch(range) {
            case 'daily': {
                const activeEmployees = await Employee.findAll({where: {admin: req.admin.userId}});
                const thisDayAttendances = await Attendance.findAll({
                    include: [{model: Employee, where: {admin: req.admin.userId}}],
                    where: {
                        time: {
                            [Op.between]: [todayBegin, todayEnd]
                        }
                    }
                });
                const employeeReport = activeEmployees.map(({employeeId, name, departement}) => {
                    const thisDayEmployeeAttendance = thisDayAttendances.find(attendance => attendance.employeeId === employeeId);
                    const status = thisDayEmployeeAttendance ? thisDayEmployeeAttendance.status : 'absent';
                    return {employeeId, name, departement, status}
                });
                return res.json(employeeReport);
            }
            case 'weekly': {
                const activeEmployees = await Employee.findAll({where: {admin: req.admin.userId}});
                const thisWeekAttendances = await Attendance.findAll({
                    include: [{model: Employee, where: {admin: req.admin.userId}}],
                    where: {
                        time: {
                            [Op.between]: [lastWeek, now]
                        }
                    }
                });
                const employeeReport = activeEmployees.map(({employeeId, name, departement}) => {
                    const thisWeekEmployeeAttendance = thisWeekAttendances.filter(attendance => attendance.employeeId === employeeId);
                    const ontime = thisWeekEmployeeAttendance.filter(attendance => attendance.status === 'ontime').length;
                    const late = thisWeekEmployeeAttendance.filter(attendance => attendance.status === 'late').length;
                    const absent = 5 - ontime - late;
                    return {employeeId, name, ontime, late, absent, departement}
                });
                return res.json(employeeReport);
            }
            case 'monthly': {
                const activeEmployees = await Employee.findAll({where: {admin: req.admin.userId}});
                const thisMonthAttendances = await Attendance.findAll({
                    include: [{model: Employee, where: {admin: req.admin.userId}}],
                    where: {
                        time: {
                            [Op.between]: [monthBegin, now]
                        }
                    }
                });
                const employeeReport = activeEmployees.map(({employeeId, name, departement}) => {
                    const thisMonthEmployeeAttendance = thisMonthAttendances.filter(attendance => attendance.employeeId === employeeId);
                    const ontime = thisMonthEmployeeAttendance.filter(attendance => attendance.status === 'ontime').length;
                    const late = thisMonthEmployeeAttendance.filter(attendance => attendance.status === 'late').length;
                    const absent = now.getDate() - ontime - late;
                    return {employeeId, name, ontime, late, absent, departement}
                });
                return res.json(employeeReport);
            }
            default: {
                return res.json(400).json({message: "Parameter 'range' must me between 'daily', 'weekly', or 'monthly'"});
            }
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Add new attandance
router.post('/', async (req, res) => {
    const {employeeId, status} = req.body;
    if(!employeeId || !status) {
        return res.status(400).json({message: "parameters 'employeeId' and 'status' are required"});
    }
    try {
        const attendance = await Attendance.create({employeeId, status});
        return res.json({message: 'Attendance created!', attendance});
    } catch (err) {
        console.log(err.message);
    }
});

export default router;