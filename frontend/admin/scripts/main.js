window.addEventListener("load", async function() {
    renderMainPage();
});

async function renderMainPage() {
    renderAdminName();
    updateCurrentBalance();
    updateUserList();
}

async function renderAdminName() {
    var nameResult = await api.get("/account/getNames");
    if (nameResult.status !== "success") {
        console.error(nameResult);
        alert(JSON.stringify(nameResult));
        return;
    }

    var {admin} = nameResult;

    document.querySelectorAll(".admin-name").forEach(element => {
        element.textContent = admin;
    });
}

async function updateCurrentBalance() {
    var {status, balance} = await api.get("/transaction/getTotalBalance");
    if (status === "success") {
        var message = "";
        var positive = true;
        if (balance == 0) {
            message = "The tab is even";
            positive = true;
        } else if (balance > 0) {
            message = `You are owed ${balance.formatPrice()}`;
            positive = true;
        } else if (balance < 0){
            message = `You owe ${Math.abs(balance).formatPrice()}`;
            positive = false;
        }

        var balanceContainer = document.querySelector("#balanceContainer");
        balanceContainer.textContent = message;
        if (positive) {
            balanceContainer.classList.remove("negative");
            balanceContainer.classList.add("positive");
        } else {
            balanceContainer.classList.remove("positive");
            balanceContainer.classList.add("negative");
        }
    }
}

async function updateUserList() {
    var {status, users} = await api.get("/user/getAll");
    if (status !== "success") {
        console.error(users);
        return;
    }

    users = moveZeroBalanceToEnd(users);

    var userList = document.querySelector(".people-columns");
    userList.innerHTML = "";

    for (var user of users) {
        userList.appendChild(createUserElement(user));
    }
}

function createUserElement(user) {
    var userElement = document.createElement("div");
    userElement.classList.add("people-card");

    var nameElement = document.createElement("h3");
    nameElement.textContent = user.name;

    var balanceElement = document.createElement("p");
    balanceElement.textContent = user.balance.formatPrice();

    if (user.balance == 0) {
        // userElement.classList.add("positive");
    } else if (user.balance > 0) {
        userElement.classList.add("positive");
    } else {
        userElement.classList.add("negative");
    }

    userElement.addEventListener("click", function() {
        switchToPerson(user.userID);
    });

    userElement.appendChild(nameElement);
    userElement.appendChild(balanceElement);

    return userElement;
}

function moveZeroBalanceToEnd(users) {
    var zeroBalance = users.filter(user => user.balance === 0);
    var nonZeroBalance = users.filter(user => user.balance !== 0);
    return nonZeroBalance.concat(zeroBalance);
}

async function startNewTab() {
    var name = await promptForText("Enter name of person");

    if (!name || !name.trim()) {
        return;
    }

    var response = await api.post("/user/add", {name});
    if (response.status !== "success") {
        alert("Could not add user");
        return;
    }

    updateUserList();

    switchToPerson(response.newUserID);
}

function backToMain() {
    showView("main-view");
    renderMainPage();
}