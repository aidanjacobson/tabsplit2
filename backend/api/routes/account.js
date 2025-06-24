const express = require("express");
const UserManager = require("../../UserManager");

const apiRouter = express.Router();

// POST login
apiRouter.post("/login", async function(req, res) {
    const { username, pin } = req.body;
    if (!username || !pin) {
        res.status(400).json({
            status: "failure",
            reason: "username or pin not specified",
            code: "err_missing_username_pin"
        });
        return;
    }

    const userValidDetails = await UserManager.validateLogin(username, pin);
    if (!userValidDetails) {
        res.status(400).json({
            status: "failure",
            reason: "Invalid username or pin",
            code: "err_invalid_username_pin"
        });
        return;
    }

    req.session.userID = userValidDetails.userID;
    req.session.username = userValidDetails.username;
    req.session.type = userValidDetails.type;

    if (userValidDetails.type === "admin") {
        res.json({
            status: "success",
            type: "admin"
        });
    } else {
        res.json({
            status: "success",
            type: "user"
        });
    }
});

// POST logout
apiRouter.post("/logout", function(req, res) {
    req.session.destroy();
    res.json({
        status: "success"
    });
});

// GET user information
apiRouter.get("/getUserInformation", async function(req, res) {
    if (!req.query.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }

    try {
        const userInformation = await UserManager.getUserInformation(req.query.userID);
        res.json({
            status: "success",
            user: userInformation
        });
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: e.message,
            code: "err_get_user_failed"
        });
    }
});

apiRouter.post("/setPin", async function(req, res) {
    if (!req.body.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID or pin not specified",
            code: "err_missing_userid_pin"
        });
        return;
    }

    try {
        await UserManager.setUserPin(req.body.userID, req.body.pin);
        res.json({
            status: "success"
        });
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: e.message,
            code: "err_set_pin_failed"
        });
    }
});

apiRouter.post("/setUsername", async function (req, res) {
    const { userID, username } = req.body;

    if (!userID || username === undefined) {
        res.status(400).json({
            status: "failure",
            reason: "userID or username not specified",
            code: "err_missing_userid_username"
        });
        return;
    }

    const sanitizedUsername = (username === "" || username === null) ? null : username;

    try {
        await UserManager.setUserUsername(userID, sanitizedUsername);
        res.json({ status: "success" });
    } catch (e) {
        res.status(400).json({
            status: "failure",
            reason: e.message,
            code: "err_set_username_failed"
        });
    }
});

apiRouter.post("/setCanLogIn", async function(req, res) {
    if (!req.body.userID || req.body.canLogIn === undefined) {
        res.status(400).json({
            status: "failure",
            reason: "userID or canLogIn not specified",
            code: "err_missing_userid_canlogin"
        });
        return;
    }

    try {
        await UserManager.setUserCanLogIn(req.body.userID, req.body.canLogIn);
        res.json({
            status: "success"
        });
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: e.message,
            code: "err_set_can_login_failed"
        });
    }
});

apiRouter.get("/getNames", async function(req, res) {
    if (req.session.type === "admin") {
        var adminName = await UserManager.getNameForAdmin();
        res.json({
            status: "success",
            admin: adminName
        });
    } else {
        var userName = await UserManager.getNameForUser(req.session.userID);
        var adminName = await UserManager.getNameForAdmin();
        res.json({
            status: "success",
            user: userName,
            admin: adminName
        });
    }
});

module.exports = apiRouter;