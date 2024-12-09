const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("..")

const UserInvitation = sequelize.define('UserInvitation', {
    userID: {
        type: DataTypes.UUID,
        allowNull: false
    },
    inviteCode: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = UserInvitation;