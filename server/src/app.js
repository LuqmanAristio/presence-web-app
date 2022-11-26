import express from 'express';
import db from './db.js';

import cors from 'cors';

import adminsRouter from '../controllers/admins.js';
import usersRouter from '../controllers/users.js';
import attendancesRouter from '../controllers/attendances.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({connected: true});
});

app.use('/api/admins', adminsRouter);
app.use('/api/users', usersRouter);
app.use('/api/attendances', attendancesRouter);

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    try {
        await db.authenticate({logging: false});
        console.log('Connection has been established successfully.');
        await db.sync({logging: false});
        console.log('Synced to database successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});