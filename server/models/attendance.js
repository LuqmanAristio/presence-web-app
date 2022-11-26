import { DataTypes } from 'sequelize';
import db from '../src/db.js';

const Attendance = db.define('Attendance', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default Attendance;