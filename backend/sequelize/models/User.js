const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("..")

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    canLogIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    }
});

module.exports = User;