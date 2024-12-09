window.addEventListener("load", main);



async function main() {
    switchTo(mainPage);

    updateCurrentBalance();

    updateUserList();
}

async function updateCurrentBalance() {
    var {status, balance} = await api.get("/transaction/getTotalBalance");
    if (status === "success") {
        document.getElementById("currentBalance").innerText = balance.formatPrice();
    }
}

async function updateUserList() {
    var {status, users} = await api.get("/user/getAll");
    if (status === "success") {
        var peopleCards = document.getElementById("peopleCards");
        peopleCards.innerHTML = "";
        
        for (var user of users) {
            peopleCards.appendChild(createPersonCard(user));
        }
    }
}

function createPersonCard(user) {
    var div = document.createElement("div");
    div.classList.add("personCard");
    
    div.onclick = function() {
        switchToUserPage(user);
    }

    var nameSpan = document.createElement("span");
    nameSpan.innerText = user.name;
    div.appendChild(nameSpan);

    div.appendChild(document.createElement("br"));

    var balanceSpan = document.createElement("span");
    balanceSpan.innerText = user.balance.formatPrice();
    div.appendChild(balanceSpan);

    return div;
}

async function doNewPerson() {
    var name = prompt("Enter name of person");
    if (!name || !name.trim()) {
        return;
    }

    var response = await api.post("/user/add", {name});
    if (response.status !== "success") {
        alert("Could not add user");
        return;
    }

    main();
}