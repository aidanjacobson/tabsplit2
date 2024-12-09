var lastViewedTransaction = null;
function switchToTransactionPage(transaction) {
    lastViewedTransaction = transaction;
    switchTo(transactionPage);
    renderTransaction(transaction);
}

function renderTransaction(transaction) {
    transDate.innerText = `Transaction Date: ${timestampToDateString(transaction.timestamp)}`;
    transAmount.value = transaction.amount;
    transLabel.value = transaction.comment;
}

async function doTransactionAmountUpdate() {
    await api.post("/transaction/edit", {transactionID: lastViewedTransaction.id, amount: transAmount.value});
}

async function doTransactionLabelUpdate() {
    await api.post("/transaction/edit", {transactionID: lastViewedTransaction.id, comment: transLabel.value});
}

async function deleteCurrentTransaction() {
    if (confirm("Are you sure?")) {
        await api.post("/transaction/delete", {transactionID: lastViewedTransaction.id});
        backToPerson();
    }
}

async function backToPerson() {
    var response = await api.get(`/user/get?userID=${lastViewedUser.userID}`);
    if (response.status !== "success") {
        console.error(response);
        return;
    }
    lastViewedUser = response.user;
    switchToUserPage(lastViewedUser);
}