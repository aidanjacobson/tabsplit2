const { DataTypes } = require('sequelize');
const sequelize = require("..")

const Admin = sequelize.define('Admin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    pin: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Admin;