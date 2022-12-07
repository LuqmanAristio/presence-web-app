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
        const activeEmployeesCount = await Employee.count({where: {admin: req.admin.userId, status: 'active'}});
        const attendances = await Attendance.findAll({
            include: [{model: Employee, where: {admin: req.admin.userId}}],
            where: {
                time: {
                    [Op.between]: [todayBegin, todayEnd]
                }
            }
        });
        const statusCount = {
            ontime: attendances.filter(attendance => attendance.status === 'ontime').length,
            late: attendances.filter(attendance => attendance.status === 'late').length,
            absent: activeEmployeesCount - attendances.length
        };
        const thisMonthAttendanceCount = await Attendance.count({
            include: [{model: Employee, where: {admin: req.admin.userId, status: 'active'}}],
            where: {
                time: {
                    [Op.between]: [monthBegin, now]
                }
            }
        });
        const thisMonthActiveEmployeeCount = await Employee.count({where: {admin: req.admin.userId, status: 'active'}});
        const percentage = (thisMonthAttendanceCount / (thisMonthActiveEmployeeCount * now.getDate())) * 100;
        return res.json({total: attendances.length, statusCount, percentage});
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