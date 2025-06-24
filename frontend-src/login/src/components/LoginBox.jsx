import { useState, useEffect } from 'react';
import UserPassInput from './UserPassInput.jsx';
import LoginCheckboxes from './checkbox/LoginCheckboxes.jsx';
import LoginButton from './LoginButton.jsx';

import './LoginBox.scss';

const LoginBox = () => {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [rememberUsername, setRememberUsername] = useState(false);
    const [rememberPin, setRememberPin] = useState(false);

    useEffect(() => {
        // if localStorage has "username", set username to that value
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            setRememberUsername(true);
        }

        // if localStorage has "pin", set pin to that value
        const storedPin = localStorage.getItem('pin');
        if (storedPin) {
            setPin(storedPin);
            setRememberPin(true);
        }
    }, []);

    return (<div className="login-box">
        <h1>Login</h1>
        <UserPassInput
            user={username}
            setUser={setUsername}
            pass={pin}
            setPass={setPin} />
        <LoginCheckboxes
            rememberUsername={rememberUsername}
            setRememberUsername={setRememberUsername}
            rememberPin={rememberPin}
            setRememberPin={setRememberPin} />

        <LoginButton
            username={username}
            pin={pin}
            rememberUsername={rememberUsername}
            rememberPin={rememberPin}
        />
    </div>);
}

export default LoginBox;