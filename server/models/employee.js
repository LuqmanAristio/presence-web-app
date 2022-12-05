import { DataTypes } from 'sequelize';
import db from '../src/db.js';

const Employee = db.define('Employee', {
    employeeId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    departement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'unavailable'),
        allowNull: false,
        defaultValue: 'active'
    }
});

export default Employee;