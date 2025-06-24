// const sequelize = require("./sequelize")

// sequelize.init();

require("dotenv").config();

const init = require("./backend/init")
const User = require("./backend/sequelize/models/User")
const Transaction = require("./backend/sequelize/models/Transaction")
const tab = require("./backend/TabSplit");
const Admin = require("./backend/sequelize/models/Admin");

const server = require("./server");

async function main() {

    await init.initAll();

    // if no admins exist, create one
    var admin = await Admin.findOne();
    if (!admin) {
        await Admin.create({
            name: process.env.DEFAULT_ADMIN_NAME,
            username: process.env.DEFAULT_ADMIN_USERNAME,
            pin: process.env.DEFAULT_ADMIN_PIN
        })
    }


    // var aidan = await tab.addNewUser("Aidan");
    // console.log("Initial balance: " + (await tab.getUserBalance(aidan)));

    // await tab.submitTransaction(aidan, 50, "test transaction");
    // console.log("New balance: " + (await tab.getUserBalance(aidan)));
}
main();