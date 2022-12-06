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
            include: [{model: Employee, where: {admin: req.admin.userId}}]
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
            }
        });
        const pureAttendances = attendances.map(({id, employeeId, time, status, createdAt, updatedAt, Employee}) => (
            {id, employeeId, employeeName: Employee.name, time, day: new Date(time).getDay(), status, createdAt, updatedAt}
        ));
        return res.json(pureAttendances);
    } catch (err) {
        console.log(err.message);
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