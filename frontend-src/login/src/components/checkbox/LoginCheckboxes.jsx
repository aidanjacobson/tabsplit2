import "./Checkboxes.scss";

import LoginCheckbox from "./LoginCheckbox.jsx";

const LoginCheckboxes = ({ rememberUsername, setRememberUsername, rememberPin, setRememberPin }) => {
    return (
        <div className="login-checkboxes">
            <LoginCheckbox label="Remember Username" checked={rememberUsername} setChecked={setRememberUsername} />
            <LoginCheckbox label="Remember PIN" checked={rememberPin} setChecked={setRememberPin} />
        </div>
    )
};

export default LoginCheckboxes;