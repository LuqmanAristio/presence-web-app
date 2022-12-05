import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import db from '../src/db.js';

const Admin = db.define('Admin', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: uuid(7),
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
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: true
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

export default Admin;