import express from 'express';
import Attendance from '../models/attendance.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const attendances = await Attendance.findAll();
        res.json(attendances);
    } catch (err) {
        console.log(err.message);
    }
});

export default router;