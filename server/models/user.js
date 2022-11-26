import { DataTypes } from 'sequelize';
import db from '../src/db.js';

const User = db.define('User', {
    userId: {
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
    }
});

export default User;