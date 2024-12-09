function settingsClick() {
    switchTo(settingsPage);

    renderSettings();
}

var userDetails = null;
async function renderSettings() {
    userDetails = await api.get(`/account/getUserInformation?userID=${lastViewedUser.userID}`);
    if (userDetails.status !== "success") {
        console.error(userDetails);
        alert(JSON.stringify(userDetails));
        return;
    }

    renderCanLogInCheckbox();
    renderUsername();
    renderPin();
}

function renderCanLogInCheckbox() {
    canLogInCheckbox.checked = userDetails.user.canLogIn;
}

function renderUsername() {
    var username = userDetails.user.username;
    if (!username) {
        username = "";
    }
    usernamesetting.innerHTML = `Username:<br>${username}`;
}

function renderPin() {
    var pin = userDetails.user.pin;
    if (!pin) {
        pin = "";
    }
    pinsetting.innerHTML = `Pin:<br>${pin}`;
}

async function doSettingsCanLogInChange() {
    var lastCanLogIn = userDetails.user.canLogIn;
    
    // if they can't currently log in, they can only be set to log in if they have a username and pin
    if (!lastCanLogIn && (!userDetails.user.username || !userDetails.user.pin)) {
        alert("User must have a username and pin to log in");
        return;
    }

    var newCanLogIn = !lastCanLogIn;
    var response = await api.post("/account/setCanLogIn", {userID: lastViewedUser.userID, canLogIn: newCanLogIn});
    if (response.status !== "success") {
        console.error(response);
        alert(JSON.stringify(response));
        return;
    }

    renderSettings();
}

async function doSettingsUsernameChange() {
    var oldUsername = userDetails.user.username;
    if (!oldUsername) {
        oldUsername = "";
    }

    var newUsername = await promptForText("Enter new username", oldUsername);
    if (!newUsername) {
        return;
    }

    newUsername = newUsername.toLowerCase().trim();

    var response = await api.post("/account/setUsername", {userID: lastViewedUser.userID, username: newUsername});
    if (response.status !== "success") {
        console.error(response);
        alert(JSON.stringify(response));
        return;
    }

    renderSettings();
}

async function doSettingsPinChange() {
    var oldPin = userDetails.user.pin;
    if (!oldPin) {
        oldPin = "";
    }

    var newPin = await promptForNumber("Enter new pin", oldPin);
    if (!newPin) {
        return;
    }

    var response = await api.post("/account/setPin", {userID: lastViewedUser.userID, pin: newPin});
    if (response.status !== "success") {
        console.error(response);
        alert(JSON.stringify(response));
        return;
    }

    renderSettings();
}

async function doSettingsDeleteUser() {
    if (lastViewedUser.balance != 0) {
        alert("User must have a balance of 0 to delete");
        return;
    }

    if (confirm("Are you sure?")) {
        var response = await api.post("/user/delete", {userID: lastViewedUser.userID});
        if (response.status !== "success") {
            console.error(response);
            alert(JSON.stringify(response));
            return;
        }

        main();
    }
}