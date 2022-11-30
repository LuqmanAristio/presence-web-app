import express from 'express';
import jwt from 'jsonwebtoken';

import Employee from '../models/employee.js';

const router = express.Router();

router.use(getAdmin);

// Get all admin employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll({where: {admin: req.admin.userId}});
        return res.json(employees);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Get all employees
router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        return res.json(employees);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({where: {employeeId: req.params.id}});
        if(!employee) return res.status(404).json({message: 'Employee not found'});
        return res.json(employee);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Add new employee
router.post('/', async (req, res) => {
    const {name, email, departement, phone, address} = req.body;
    if(!name || !departement || !phone) {
        return res.status(400).json({message: "parameters 'name', 'email', 'departement', 'phone', and 'address' are required"});
    }
    try {
        const employee = await Employee.create({name, email, departement, phone, address, admin: req.admin.userId});
        return res.json({message: 'Employee created!', employee});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Delete employee by ID
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({where: {employeeId: req.params.id}});
        if(!employee) return res.status(404).json({message: 'Employee not found'});
        await employee.destroy();
        return res.json({message: 'Employee deleted', employee});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

function getAdmin(req, res, next) {
    try {
        const adminToken = req.headers['authorization'].split(' ').at(-1);
        const admin = jwt.verify(adminToken, process.env.JWT_SECRET);
        if(!admin) return res.status(401).json({message: 'Token is not a valid JWT or not a valid user', error: 'Invalid token'});
        req.admin = admin;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server token error', error: err.message});
    }
}

export default router;