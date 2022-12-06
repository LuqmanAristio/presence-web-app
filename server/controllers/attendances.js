import express from 'express';

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
        const pureAttendances = attendances.map(({id, employeeId, time, status, createdAt, updatedAt}) => (
            {id, employeeId, time, status, createdAt, updatedAt}
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