import api from '../../../common/apiutils.js';

const LoginButton = ({ username, pin, rememberUsername, rememberPin }) => {
    async function tryLogin() {
        var inputUsername = username.toLowerCase().trim();
        var inputPin = pin.trim();

        if (inputUsername === '' || inputPin === '') {
            alert('Username and PIN cannot be empty.');
            return;
        }

        const response = await api.post('/account/login', {
            username: inputUsername,
            pin: inputPin
        });

        if (response.status !== "success") {
            alert("Invalid username or PIN");
            return;
        }

        // if rememberUsername, set localStorage "username" to inputUsername
        // else remove localStorage "username"
        if (rememberUsername) {
            localStorage.setItem('username', inputUsername);
        } else {
            localStorage.removeItem('username');
        }

        // if rememberPin, set localStorage "pin" to inputPin
        // else remove localStorage "pin"
        if (rememberPin) {
            localStorage.setItem('pin', inputPin);
        } else {
            localStorage.removeItem('pin');
        }

        // the user is authenticated, redirect to page as needed
        if (response.type === "admin") {
            window.location.href = '/admin';
        } else if (response.type === "user") {
            window.location.href = '/user';
        } else {
            alert("Unknown user type: " + response.type);
        }
    }

    return (
        <div className="login-button">
            <button onClick={tryLogin}>Login</button>
        </div>
    );
};

export default LoginButton;