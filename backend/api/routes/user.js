const express = require("express");
const tab = require("../../TabSplit");
const apiRouter = express.Router();

apiRouter.get("/get", async function(req, res) {
    if (!req.query.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        })
        return;
    }
    try {
        var result = await tab.user.get(req.query.userID);
        res.json({
            status: "success",
            user: result
        })
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "Could not find user",
            code: "err_get_user_failed"
        });
    }
})

apiRouter.get("/getAll", async function(req, res) {
    var users = await tab.user.getAll();
    res.json({
        status: "success",
        users: users
    })
})

apiRouter.post("/add", async function(req, res) {
    if (!req.body.name) {
        res.status(400).json({
            status: "failure",
            reason: "name not specified",
            code: "err_user_missing_name"
        });
        return;
    }
    try {
        var responseJSON = {
            status: "success",
            newUserID: await tab.user.add(req.body.name)
        }
        res.json(responseJSON);
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "Could not create user",
            code: "err_create_user_failed"
        })
        return;
    }
});

apiRouter.post("/delete", async function(req, res) {
    if (!req.body.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    try {
        await tab.user.delete(req.body.userID);
        res.json({status: "success"})
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "Could not delete user",
            code: "err_delete_user_failed"
        })
    }
})

apiRouter.post("/edit", async function(req, res) {
    if (!req.body.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    try {
        await tab.user.edit(req.body.userID, req.body);
        res.json({status: "success"});
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "Could not edit user",
            code: "err_edit_user_failed"
        })
    }
})

module.exports = apiRouter;