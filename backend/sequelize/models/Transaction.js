const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("..")

const Transaction = sequelize.define('Transaction', {
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
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userID: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

module.exports = Transaction;

// module.exports = (sequelize) => {
//     const Transaction = sequelize.define('Transaction', {
//         amount: {
//             type: DataTypes.DOUBLE,
//             allowNull: false
//         },
//         comment: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: ""
//         },
//         timestamp: {
//             type: DataTypes.DATE,
//             allowNull: false
//         }
//     })
//     Transaction.sync();
// }