window.addEventListener("load", main);

async function main() {
    var username = localStorage.getItem("username");
    var pin = localStorage.getItem("pin");

    if (username) {
        document.getElementById("username").value = username;
        document.getElementById("remember-username").checked = true;
    }

    if (pin) {
        document.getElementById("pin").value = pin;
        document.getElementById("remember-pin").checked = true;
    }
}

async function tryLogin() {
    var inputUsername = document.getElementById("username").value.toLowerCase().trim();
    var inputPin = document.getElementById("pin").value.trim();

    if (!inputUsername || !inputPin) {
        alert("Username or pin not specified");
        return;
    }

    var response = await api.post("/account/login", {
        username: inputUsername,
        pin: inputPin
    });

    if (response.status !== "success") {
        alert("Invalid username or pin");
        return;
    }

    // if remember username is checked, save it
    if (document.getElementById("remember-username").checked) {
        localStorage.setItem("username", inputUsername);
    } else {
        localStorage.removeItem("username");
    }

    // if remember pin is checked, save it
    if (document.getElementById("remember-pin").checked) {
        localStorage.setItem("pin", inputPin);
    } else {
        localStorage.removeItem("pin");
    }

    if (response.type === "admin") {
        window.location = "/admin";
    } else {
        window.location = "/user";
    }
}