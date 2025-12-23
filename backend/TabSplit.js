const User = require("./sequelize/models/User")
const Transaction = require("./sequelize/models/Transaction")

async function getAllUsers() {
    var allValues = await User.findAll();
    var out = allValues.map(value=>({name: value.name, username: value.username, userID: value.userID}))

    // for each user, get their balance
    for (var user of out) {
        user.balance = await getUserBalance(user.userID);
    }

    return out;
}

async function getUserDetails(userID) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }
    return {
        name: user.name,
        username: user.username,
        userID: user.userID,
        balance: await getUserBalance(userID)
    }
}

async function addNewUser(name) {
    try {
        var newUser = await User.create({
            name
        })
        return newUser.userID;
    } catch(e) {
        throw new Error("Could not create user")
        // return null;
    }
}

async function getUserBalance(userID) {
    var transactions = await getUserTransactions(userID);
    var sum = 0;
    for (var transaction of transactions) {
        sum += transaction.amount;
    }
    return roundCents(sum);
}

async function editUser(userID, {name, username}) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }
    if (typeof name !== "undefined") {
        user.name = name;
    }
    if (typeof username !== "undefined") {
        user.username = username;
    }
    await user.save();
}

async function deleteUser(userID) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user");
    }
    await user.destroy();
}

async function getUserTransactions(userID) {
    var results = await Transaction.findAll({where: {userID}});
    var transactions = [];
    for (var result of results) {
        transactions.push(result);
    }
    // sort by timestamp
    transactions.sort((a, b)=>b.timestamp - a.timestamp);
    return transactions;
}

async function getTransactionDetails(transactionID) {
    var transaction = await Transaction.findOne({where:{id: transactionID}});
    var allTransactions = await Transaction.findAll({where:{userId:transaction.userID}})
    var transactionsUntilNow = allTransactions.filter(t=>t.timestamp<=transaction.timestamp);
    var totalSum = transactionsUntilNow.reduce((acc,cur)=>acc+cur.amount,0);
    if (!transaction) {
        throw new Error("Could not find transaction");
    }
    // need to return amount, comment, timestamp, id, userID
    return {
        amount: transaction.amount,
        comment: transaction.comment,
        timestamp: transaction.timestamp,
        id: transaction.id,
        userID: transaction.userID,
        total: totalSum
    }
}

async function submitTransaction(userID, amount, comment="") {
    try {
        var newTransaction = await Transaction.create({
            amount,
            comment,
            userID,
            timestamp: Date.now()
        });
        return newTransaction.transactionID;
    } catch(e) {
        throw new Error("Could not submit transaction")
        // return null;
    }
}

async function submitArchivedTransaction(userID, amount, comment, timestamp) {
    try {
        var newTransaction = await Transaction.create({
            amount,
            comment,
            userID,
            timestamp
        });
        return newTransaction.transactionID;
    } catch(e) {
        throw new Error("Could not submit transaction")
        // return null;
    }
}

async function editTransaction(transactionID, {amount, comment, timestamp}) {
    var transaction = await Transaction.findOne({where: {id: transactionID}});
    if (!transaction) {
        throw new Error("Could not find transaction")
    }
    if (typeof amount !== "undefined") {
        transaction.amount = amount;
    }
    if (typeof comment !== "undefined") {
        transaction.comment = comment;
    }
    if (typeof timestamp !== "undefined") {
        transaction.timestamp = timestamp;
    }
    await transaction.save();
}

async function deleteTransaction(transactionID) {
    var transaction = await Transaction.findOne({where: {id: transactionID}});
    if (!transaction) {
        throw new Error("Could not find transaction");
    }
    await transaction.destroy();
}

async function getTotalBalance() {
    var transactions = await Transaction.findAll();
    var sum = 0;
    for (var transaction of transactions) {
        sum += transaction.amount;
    }
    return roundCents(sum);
}

function roundCents(amount) {
    return Math.round(amount * 100) / 100;
}

// module.exports = {getAllUsers, addNewUser, getUserBalance, getUserTransactions, submitTransaction};
module.exports = {
    user: {
        get: getUserDetails,
        add: addNewUser,
        getAll: getAllUsers,
        edit: editUser,
        delete: deleteUser,
        getBalance: getUserBalance
    },
    transaction: {
        get: getTransactionDetails,
        submit: submitTransaction,
        submitArchived: submitArchivedTransaction,
        getUserTransactions: getUserTransactions,
        edit: editTransaction,
        delete: deleteTransaction,
        getTotalBalance: getTotalBalance
    }
}