function initiateTransaction(positive) {
    switchTo(completeTransaction);
    actionType.innerText = positive ? "pay" : "get paid by";
    actionPerson.innerText = lastViewedUser.name;
    actionAmount.value = "";
    actionAmount.setAttribute("data-sign", positive ? "+" : "-");
    actionAmount.focus();
}

async function submitTransaction() {
    var amount = parseFloat(actionAmount.value);
    if (isNaN(amount)) {
        alert("Invalid amount");
        return;
    }
    
    if (actionAmount.getAttribute("data-sign") === "-") {
        amount = -amount;
    }

    var label = prompt("Enter a transaction Label");
    
    var response = await api.post("/transaction/submit", {
        amount,
        comment: label,
        userID: lastViewedUser.userID
    });

    if (response.status !== "success") {
        alert("Could not submit transaction");
        return;
    }

    backToPerson();
}