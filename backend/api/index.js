const express = require("express");
const apiRouter = express.Router();

const user = require("./routes/user");
const transaction = require("./routes/transaction");
const account = require("./routes/account");

const auth = require("../auth");
apiRouter.use(auth.checkAPIPermissions);

apiRouter.use("/user", user);
apiRouter.use("/transaction", transaction);
apiRouter.use("/account", account);

module.exports = apiRouter;