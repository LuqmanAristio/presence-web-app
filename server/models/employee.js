import { DataTypes } from 'sequelize';
import db from '../src/db.js';
import { v4 as uuid } from 'uuid';

const Employee = db.define('Employee', {
    employeeId: {
        type: DataTypes.UUID,
        defaultValue: uuid(),
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
    }
});

export default Employee;