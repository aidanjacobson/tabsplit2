var lastUser;
var lastUserTransactions = [];
async function switchToPerson(userID) {
    var {status, user} = await api.get(`/user/get?userID=${userID}`);
    if (status !== "success") {
        console.error(user);
        return;
    }

    lastUser = user;
    
    // set the name
    document.querySelector("#personName").textContent = user.name;
    
    // set the balance
    var balanceContainer = document.querySelector("#personBalance");
    balanceContainer.textContent = user.balance.formatPrice();
    
    await updateTransactions();
   
   
    showView("person-view");
}

async function updateTransactions() {
    var {status, transactions} = await api.get(`/transaction/getTransactions?userID=${lastUser.userID}`);
    if (status !== "success") {
        console.error(transactions);
        return;
    }

    lastUserTransactions = transactions;

    var transactionList = document.querySelector("#transaction-list");
    transactionList.innerHTML = "";

    if (lastUserTransactions.length === 0) {
        transactionList.innerHTML = "<h3>There are no transactions to display</h3>";
    }

    for (var transaction of lastUserTransactions) {
        transactionList.appendChild(createTransactionCard(transaction));
    }
}

function createTransactionCard(transaction) {
    var transactionElement = document.createElement("div");
    transactionElement.classList.add("transaction-card");

    var amountText = transaction.amount.formatPrice(true);
    var dateText = timestampToDateString(transaction.timestamp);

    var topText = `${amountText} - ${dateText}`;

    var label = transaction.comment;
    label = label.trim();

    transactionElement.innerHTML = `${topText}<br>${label}`;

    if (transaction.amount < 0) {
        transactionElement.classList.add("negative");
    } else {
        transactionElement.classList.add("positive");
    }

    transactionElement.addEventListener("click", function() {
        switchToTransaction(transaction.id);
    });

    return transactionElement;
}

async function doNewTransaction(cover=true) {
    var question = "";

    if (cover) {
        question = `How much do you want to pay ${lastUser.name}?`;
    } else {
        question = `How much do you want to get paid by ${lastUser.name}?`;
    }

    var amount = await promptForNumber(question);
    if (amount === null || amount === "" || amount === 0) {
        return;
    }

    if (!cover) {
        amount = -amount;
    }

    var comment = await promptForText("Enter a label for this transaction:");
    
    var {status, transactionID} = await api.post("/transaction/submit", {
        userID: lastUser.userID,
        amount,
        comment
    });

    if (status !== "success") {
        console.error(transactionID);
        alert("Could not submit transaction");
        return;
    }

    switchToPerson(lastUser.userID);
}

function backToPerson() {
    switchToPerson(lastUser.userID);
}