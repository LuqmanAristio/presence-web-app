import { DataTypes } from 'sequelize';
import db from '../src/db.js';

const Employee = db.define('User', {
    employeeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [11, 11]
        }
    },
    admin: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

export default Employee;