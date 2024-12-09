const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../../sequelize")

const PendingTransaction = sequelize.define('PendingTransaction', {
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userID: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = PendingTransaction;