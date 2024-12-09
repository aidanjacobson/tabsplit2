function switchToUserPage(user) {
    switchTo(personPage);
    renderPerson(user);
}

var lastViewedUser = null;
function renderPerson(user) {
    lastViewedUser = user;
    renderName(user);
    personBalance.innerText = user.balance.formatPrice();
    loadTransactions(user.userID);
}

function renderName(user) {
    personName.innerText = user.name;

    /*
        length - fontsize
        <=5 - 300
        6 - 250
        7 - 200
        8 - 175
        9 - 150
        >=10 - 125
    */

    var fontSize = 300;
    
    if (user.name.length === 6) {
        fontSize = 250;
    } else if (user.name.length === 7) {
        fontSize = 200;
    } else if (user.name.length === 8) {
        fontSize = 175;
    } else if (user.name.length === 9) {
        fontSize = 150;
    } else if (user.name.length >= 10) {
        fontSize = 125;
    }

    personName.style.fontSize = `${fontSize}px`;
}

async function loadTransactions(userID) {
    var response = await api.get(`/transaction/getTransactions?userID=${userID}`);
    if (response.status !== "success") {
        console.error(response);
        return;
    }

    var transactionsList = response.transactions;

    transactions.innerHTML = "";
    for (var transaction of transactionsList) {
        transactions.appendChild(createTransactionCard(transaction));
    }
}

function createTransactionCard(transaction) {
    var div = document.createElement("div");
    div.classList.add("transaction");

    var transactionType = transaction.amount < 0 ? "negative" : "positive";
    div.classList.add(transactionType);

    div.onclick = function() {
        switchToTransactionPage(transaction);
    }

    var amount = transaction.amount.formatPrice(true);
    var dateString = timestampToDateString(transaction.timestamp);
    var transactionHeader = `${amount} - ${dateString}`;

    var label = transaction.comment;

    div.innerHTML = `${transactionHeader}<br>${label}`;

    return div;
}

async function changeName() {
    var newName = prompt("Enter new name", lastViewedUser.name);

    if (!newName || !newName.trim()) {
        return;
    }

    var {status} = await api.post("/user/edit", {userID: lastViewedUser.userID, name: newName});
    if (status !== "success") {
        alert("Could not change name");
        return;
    }

    backToPerson();
}

function backToMain() {
    main();
}