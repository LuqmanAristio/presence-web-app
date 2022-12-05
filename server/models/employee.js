import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import db from '../src/db.js';

const Employee = db.define('Employee', {
    employeeId: {
        type: DataTypes.UUID,
        defaultValue: uuid(7),
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
            len: [11, 11]
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
    }
});

export default Employee;