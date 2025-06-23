const fs = require("fs");

const {Sequelize} = require("sequelize");
// const {createAssociations} = require("./associations")

const isRemote = () => {
    // check if /data exists, if it does, we are running on the remote server
    return fs.existsSync("/data") && fs.lstatSync("/data").isDirectory();
}


var db_path = isRemote() ? "/data/tabsplit.db" : "./temp_db/tabsplit.db";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: db_path,
    logging: false
})

sequelize.init = function() {
    // createAssociations(sequelize);
}

module.exports = sequelize;