var lastTransaction;

async function switchToTransaction(transactionID) {
    var {status, transaction} = await api.get(`/transaction/get?transactionID=${transactionID}`);
    if (status !== "success") {
        console.error(transaction);
        return;
    }
    
    lastTransaction = transaction;
    await renderTransaction();

    showView("transaction-view");
}

async function renderTransaction() {
    var userID = lastTransaction.userID;

    var {user} = await api.get(`/user/get?userID=${userID}`);

    var name = user.name;
    
    // render the title
    var title = `Transaction with ${name}`;
    document.querySelector("#transaction-person").textContent = title;

    // render the summary
    var summary = "";

    var amount = lastTransaction.amount;

    if (amount < 0) {
        summary = `You owe ${name} ${Math.abs(amount).formatPrice()}`;
    } else {
        summary = `${name} owes you ${amount.formatPrice()}`;
    }
    document.querySelector("#transaction-summary").textContent = summary;

    var totalAmount = lastTransaction.total;
    var totalSummary = `Balance as of here: ${totalAmount.formatPrice()}`
    document.querySelector("#total-summary").textContent = totalSummary;

    // render the timestamp
    var timestamp = timestampToDateString(lastTransaction.timestamp);
    document.querySelector("#transaction-date").textContent = timestamp;

    // render the amount
    var amountElement = document.querySelector("#transaction-amount");
    amountElement.textContent = amount.formatPrice(true);

    // render the comment
    var comment = `"${lastTransaction.comment.trim()}"`;
    if (comment === '""') {
        comment = "";
    }
    document.querySelector("#transaction-label").textContent = comment;
}

async function deleteTransaction() {
    if (!confirm("Are you sure you want to delete this transaction?")) {
        return;
    }

    var {status} = await api.post("/transaction/delete", {transactionID: lastTransaction.id});
    if (status !== "success") {
        console.error(status);
        alert("Unable to delete transaction");
        return;
    }

    // alert("Transaction deleted successfully");
    switchToPerson(lastTransaction.userID);
}

async function editAmount() {
    var oldAmount = lastTransaction.amount;
    var newAmount = await promptForNumber("Enter the new amount for this transaction:", oldAmount);
    if (newAmount === null) {
        return;
    }

    var {status} = await api.post("/transaction/edit", {transactionID: lastTransaction.id, amount: newAmount});
    if (status !== "success") {
        console.error(status);
        alert("Unable to edit transaction");
        return;
    }

    switchToTransaction(lastTransaction.id);
}

async function editLabel() {
    var oldComment = lastTransaction.comment;
    var newComment = await promptForText("Enter the new label for this transaction:", oldComment);
    if (newComment === null) {
        return;
    }

    var {status} = await api.post("/transaction/edit", {transactionID: lastTransaction.id, comment: newComment});
    if (status !== "success") {
        console.error(status);
        alert("Unable to edit transaction");
        return;
    }

    switchToTransaction(lastTransaction.id);
}