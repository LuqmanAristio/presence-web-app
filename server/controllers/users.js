import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({where: {userId: req.params.id}});
        if(!user) return res.status(404).json({message: 'User not found'});
        return res.json(user);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Add new user
router.post('/', async (req, res) => {
    const {name, departement} = req.body;
    if(!name || !departement) {
        return res.status(400).json({message: "parameters 'name' and 'departement' are required"});
    }
    try {
        const user = await User.create({name, departement});
        return res.json({message: 'User created!', user});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOne({where: {userId: req.params.id}});
        if(!user) return res.status(404).json({message: 'User not found'});
        await user.destroy();
        return res.json({message: 'User deleted', user});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server/database error', error: err.message});
    }
});

export default router;