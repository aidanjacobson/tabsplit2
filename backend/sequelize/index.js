const remote = require("../utils/remote");
const {Sequelize} = require("sequelize");
// const {createAssociations} = require("./associations")


var db_path = remote.isRemote() ? "/data/tabsplit.db" : "./temp_db/tabsplit.db";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: db_path,
    logging: false
})

sequelize.init = function() {
    // createAssociations(sequelize);
}

module.exports = sequelize;