async function openPersonSettings() {
    await syncAccountSettings();
    showView("person-settings-view");
}

var lastAccountSettings = {};
async function syncAccountSettings() {
    var {status, user} = await api.get(`/account/getUserInformation?userID=${lastUser.userID}`);
    if (status !== "success") {
        console.error(user);
        return;
    }

    lastAccountSettings = user;

    // set the name at the top
    document.querySelector("#setting-name-top").textContent = `Settings for ${user.name}`;

    // set the can log in checkbox
    document.querySelector("#canLogIn").checked = user.canLogIn;

    // set the username
    document.querySelector("#usernameDisplay").textContent = user.username;
    if (!user.username) {
        document.querySelector("#usernameDisplay").textContent = "Not Set";
    }

    // set the pin
    document.querySelector("#pinDisplay").textContent = user.pin;
    if (!user.pin) {
        document.querySelector("#pinDisplay").textContent = "Not Set";
    }

    // set the name
    document.querySelector("#nameDisplay").textContent = user.name;
    if (!user.name) {
        document.querySelector("#nameDisplay").textContent = "Not Set";
    }
}

async function doCanLogInUpdate() {
    var canLogIn = document.querySelector("#canLogIn").checked;

    if (canLogIn && (!lastAccountSettings.username || !lastAccountSettings.pin)) {
        alert("Cannot enable can log in without a username and pin set");
        document.querySelector("#canLogIn").checked = false;
        return;
    }

    var {status} = await api.post("/account/setCanLogIn", {userID: lastUser.userID, canLogIn});

    if (status === "success") {
        syncAccountSettings();
    } else {
        alert("Failed to update can log in status");
    }
}

async function changeUsername() {
    var oldUsername = lastAccountSettings.username;
    var username = await promptForText("Enter new username", oldUsername);
    var {status} = await api.post("/account/setUsername", {userID: lastUser.userID, username});

    if (status === "success") {
        syncAccountSettings();
    } else {
        alert("Failed to update username");
    }
}

async function changePin() {
    var oldPin = lastAccountSettings.pin;
    var pin = await promptForNumber("Enter new pin", oldPin);
    pin = pin.toString();
    var {status} = await api.post("/account/setPin", {userID: lastUser.userID, pin});

    if (status === "success") {
        syncAccountSettings();
    } else {
        alert("Failed to update pin");
    }
}

async function changeNameFromSetting() {
    var oldName = lastAccountSettings.name;
    var name = await promptForText("Enter new name", oldName);
    var {status} = await api.post("/user/edit", {userID: lastUser.userID, name});

    if (status === "success") {
        syncAccountSettings();
    } else {
        alert("Failed to update name");
    }
}

async function attemptDeletePerson() {
    // get the current balance, make sure it's 0
    var {status, balance} = await api.get(`/transaction/getUserBalance?userID=${lastUser.userID}`);

    if (balance !== 0) {
        alert("Cannot delete a person with a non-zero balance");
        return;
    }

    if (!confirm("Are you sure you want to delete this person?")) {
        return;
    }

    var {status} = await api.post("/user/delete", {userID: lastUser.userID});
    if (status === "success") {
        await renderMainPage();
    } else {
        alert("Failed to delete person");
    }
    showView("main-view");
}