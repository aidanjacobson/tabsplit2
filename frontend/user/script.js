window.addEventListener("load", main);

async function main() {
    renderNames();
    updateTransactions();
}

var myName = null;
var adminName = null;
async function renderNames() {
    var response = await api.get("/account/getNames");
    if (response.status !== "success") {
        console.error(response);
        alert(JSON.stringify(response));
        return;
    }

    var {admin, user} = response;
    myName = user;
    adminName = admin;

    document.querySelectorAll(".user-name").forEach(element => {
        element.textContent = user;
    });

    document.querySelectorAll(".admin-name").forEach(element => {
        element.textContent = admin;
    });
}

/*
    negative transactions from the api indicate the admin owes the user money
    positive transactions from the api indicate the user owes the admin money

    however, negative api transactions are positive for the user
    and positive api transactions are negative for the user
*/
async function updateTransactions() {
    var response = await api.get("/transaction/getMine");
    if (response.status !== "success") {
        console.error(response);
        alert(JSON.stringify(response));
        return;
    }

    var balance = response.balance;
    if (balance == 0) {
        balanceContainer.classList.remove("negative");
        balanceContainer.classList.add("positive");
        balanceContainer.textContent = `You don't owe ${adminName} anything.`;
    }
    else if (balance < 0) {
        balanceContainer.classList.remove("negative");
        balanceContainer.classList.add("positive");
        balanceContainer.textContent = `You are owed ${Math.abs(balance).formatPrice()} by ${adminName}.`;
    }
    else {
        balanceContainer.classList.remove("positive");
        balanceContainer.classList.add("negative");
        balanceContainer.textContent = `You owe ${adminName} ${Math.abs(balance).formatPrice()}.`;
    }

    var transactionsList = response.transactions;
    var transactionListElement = document.getElementById("transaction-list");
    transactionListElement.innerHTML = "";

    for (var transaction of transactionsList) {
        transactionListElement.appendChild(createTransactionCard(transaction));
    }
}

function createTransactionCard(transaction) {
    var li = document.createElement("li");
    li.classList.add("transaction-item");

    var amount = transaction.amount;
    var amount = amount * -1; // flip the sign so it's positive for the user

    if (amount < 0) {
        li.classList.add("negative");
    } else {
        li.classList.add("positive");
    }

    var amountText = amount.formatPrice(true);
    var timestampText = timestampToDateString(transaction.timestamp);

    var headerSpan = document.createElement("span");
    headerSpan.innerText = `${amountText} - ${timestampText}`;
    li.appendChild(headerSpan);

    var labelSpan = document.createElement("span");
    labelSpan.innerText = transaction.comment;
    li.appendChild(labelSpan);

    return li;
}

Number.prototype.formatPrice = function(plus=false) {
    var num = this;
    num = Math.floor(num*100)/100;
    if (num<0) {
        return "-$" + (twoDecimalDigits(-num));
    } else if (plus) {
        return "+$" + twoDecimalDigits(num);
    } else {
        return "$" + twoDecimalDigits(num);
    }
}

function twoDecimalDigits(num) {
    var fixed = num.toFixed(2);

    // if the number ends with .00, remove it
    if (fixed.endsWith(".00")) {
        fixed = fixed.slice(0, -3);
    }

    return fixed;
}

function timestampToDateString(timestamp) {
    var date = new Date(timestamp);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function logout() {
    api.post("/account/logout");
    window.location = "/login";
}