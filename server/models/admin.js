import { DataTypes } from 'sequelize';
import db from '../src/db.js';

const Admin = db.define('Admin', {
    userId: {
        type: DataTypes.UUID,
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