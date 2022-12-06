import { DataTypes } from 'sequelize';
import db from '../src/db.js';

import Employee from './employee.js';

const Attendance = db.define('Attendance', {
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('ontime', 'late', 'absent'),
        allowNull: false
    }
});

Attendance.belongsTo(Employee, {foreignKey: 'employeeId'});

export default Attendance;