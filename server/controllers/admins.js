import express from 'express';

import getAdmin from '../middlewares/getAdmin.js'; 
import Admin from '../models/admin.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';


const router = express.Router();

// Get all admins
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.findAll();
        return res.json(admins);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Get info by token
router.get('/me', getAdmin, (req, res) => {
    const {userId, name, departement} = req.admin;
    return res.json({userId, name, departement});
});

// Get admin by ID
router.get('/:id', async (req, res) => {
    try {
        const admin = await Admin.findOne({where: {userId: req.params.id}});
        if(!admin) return res.status(404).json({message: 'Admin not found'});
        return res.json(admin);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Add new admin
router.post('/register', async (req, res) => {
    const {name, departement, username, password} = req.body;
    if(!name || !departement || !username || !password) {
        return res.status(400).json({message: "parameters 'name', 'departement', 'username', and 'password' are required"});
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({userId: nanoid(7), name, departement, username, password: hashedPassword});
        return res.json({message: 'Admin created!', admin});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Login admin
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const admin = await Admin.findOne({where: {username}});
    if(!admin) return res.status(401).json({ok: false, message: 'Username or Password is incorrect!'});

    const isValidated = await bcrypt.compare(password, admin.password);
    if(!isValidated) return res.status(401).json({ok: false, message: 'Username or Password is incorrect!'});

    const adminPayload = await Admin.findOne({where: {username}, attributes: {exclude: ['username', 'password']}});
    const token = jwt.sign(adminPayload.toJSON(), process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({ok: true, message: 'Logged In', token});
});

// Delete admin by ID
router.delete('/:id', async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {userId: req.params.id},
            attributes: {exclude: ['password']}
        });
        if(!admin) return res.status(404).json({message: 'Admin not found'});
        await admin.destroy();
        return res.json({message: 'Admin deleted', admin});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

export default router;
