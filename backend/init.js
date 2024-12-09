const sequelize = require("./sequelize")
const User = require("./sequelize/models/User")
const UserInvitation = require("./sequelize/models/UserInvitation")
const Transaction = require("./sequelize/models/Transaction")
const Admin = require("./sequelize/models/Admin")
const PendingTransaction = require("./sequelize/models/PendingTransaction")

async function initAll() {
    await User.sync();
    await UserInvitation.sync();
    await Transaction.sync();
    await Admin.sync();
    await PendingTransaction.sync();
}

sequelize.init();

module.exports = {sequelize, initAll}