const express = require("express");
const tab = require("../../TabSplit")
const apiRouter = express.Router();

apiRouter.get("/getUserBalance", async function(req, res) {
    if (!req.query.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    res.json({
        status: "success",
        balance: await tab.user.getBalance(req.query.userID)
    });
});


apiRouter.get("/getTransactions", async function(req, res) {
    if (!req.query.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    res.json({
        status: "success",
        transactions: await tab.transaction.getUserTransactions(req.query.userID)
    })
})

apiRouter.get("/getMine", async function(req, res) {
    if (!req.session.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    res.json({
        status: "success",
        transactions: await tab.transaction.getUserTransactions(req.session.userID),
        balance: await tab.user.getBalance(req.session.userID)
    })
});

apiRouter.post("/submit", async function(req, res) {
    if (!req.body.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    if (req.body.amount === undefined) {
        res.status(400).json({
            status: "failure",
            reason: "amount not specified",
            code: "err_missing_amount"
        });
        return;
    }
    try {
        var response = await tab.transaction.submit(req.body.userID, req.body.amount, req.body.comment);
        res.json({
            status: "success",
            newTransactionID: response
        })
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "could not submit transaction",
            code: "err_submit_transaction_failed"
        })
    }
})

apiRouter.post("/submitArchived", async function(req, res) {
    if (!req.body.userID) {
        res.status(400).json({
            status: "failure",
            reason: "userID not specified",
            code: "err_missing_userid"
        });
        return;
    }
    if (req.body.amount === undefined) {
        res.status(400).json({
            status: "failure",
            reason: "amount not specified",
            code: "err_missing_amount"
        });
        return;
    }
    if (!req.body.timestamp) {
        res.status(400).json({
            status: "failure",
            reason: "timestamp not specified",
            code: "err_missing_timestamp"
        });
        return;
    }
    try {
        var response = await tab.transaction.submitArchived(req.body.userID, req.body.amount, req.body.comment, req.body.timestamp);
        res.json({
            status: "success",
            newTransactionID: response
        })
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "could not submit transaction",
            code: "err_submit_transaction_failed"
        })
    }
})

apiRouter.get("/get", async function(req, res) {
    if (!req.query.transactionID) {
        res.status(400).json({
            status: "failure",
            reason: "transactionID not specified",
            code: "err_missing_transactionid"
        });
        return;
    }
    try {
        var result = await tab.transaction.get(req.query.transactionID);
        res.json({
            status: "success",
            transaction: result
        })
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "could not get transaction",
            code: "err_get_transaction_failed"
        })
    }
});

apiRouter.post("/edit", async function(req, res) {
    if (!req.body.transactionID) {
        res.status(400).json({
            status: "failure",
            reason: "transactionID not specified",
            code: "err_missing_transactionid"
        });
        return;
    }
    try {
        await tab.transaction.edit(req.body.transactionID, req.body);
        res.json({status: "success"});
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "could not edit transaction",
            code: "err_edit_transaction_failed"
        })
    }
})

apiRouter.post("/delete", async function(req, res) {
    if (!req.body.transactionID) {
        res.status(400).json({
            status: "failure",
            reason: "transactionID not specified",
            code: "err_missing_transactionid"
        });
        return;
    }
    try {
        await tab.transaction.delete(req.body.transactionID);
        res.json({status: "success"});
    } catch(e) {
        res.status(400).json({
            status: "failure",
            reason: "could not delete transaction",
            code: "err_delete_transaction_failed"
        })
    }
})

apiRouter.get("/getTotalBalance", async function(req, res) {
    res.json({
        status: "success",
        balance: await tab.transaction.getTotalBalance()
    })
})

module.exports = apiRouter;