import api from "../../../../common/apiutils";

import { usePromptHandlers } from "../prompt/prompt"

const SettingsFields = ({ accountSettings, refresh }) => {
    const { promptNumber, promptText } = usePromptHandlers();

    async function setCanLogIn(canLogIn) {
        const response = await api.post("/account/setCanLogIn", {
            userID: accountSettings.userID,
            canLogIn: canLogIn
        });

        if (response.status != "success") {
            alert("Error setting can log in: " + response.reason);
            return;
        }

        refresh();
    }

    async function doEditName() {
        const oldName = accountSettings.name;
        const newName = await promptText("Enter new name:", oldName);
        if (!newName || newName === oldName) return;

        const response = await api.post("/user/edit", {
            userID: accountSettings.userID,
            name: newName
        });

        if (response.status != "success") {
            alert("Error setting name: " + response.reason);
            return;
        }
        refresh();
    }

    async function doEditUsername() {
        const oldUsername = accountSettings.username;
        const newUsername = await promptText("Enter new username:", oldUsername);
        if (newUsername === null) return; // User cancelled

        const response = await api.post("/account/setUsername", {
            userID: accountSettings.userID,
            username: newUsername
        });

        if (response.status != "success") {
            alert("Error setting username: " + response.reason);
            return;
        }
        refresh();
    }

    async function doEditPin() {
        // do not include the old pin as default
        let newPin = await promptNumber("Enter new pin:");

        if (newPin === null) return; // User cancelled

        newPin = newPin.toString();

        if (newPin == "0") {
            // they tried to enter "" which should be treated as no pin (null)
            newPin = null;
        }

        const response = await api.post("/account/setPin", {
            userID: accountSettings.userID,
            pin: newPin
        });

        if (response.status != "success") {
            alert("Error setting pin: " + response.reason);
            return;
        }
        refresh();
    }

    return (<div className="settings-fields">
        <div className="settings-field">
            <div className="settings-field-label">Can Log In</div>
            <div className="settings-field-value">
                <input type="checkbox" checked={accountSettings.canLogIn} onClick={e => setCanLogIn(e.target.checked)} />
            </div>
        </div>

        <div className="settings-field">
            <div className="settings-field-label">Username</div>
            <div className="settings-field-value" onClick={doEditUsername}>
                {accountSettings.username ?? "Not Set"}
            </div>
        </div>

        <div className="settings-field">
            <div className="settings-field-label">Pin</div>
            <div className="settings-field-value" onClick={doEditPin}>
                {accountSettings.pin ?? "Not Set"}
            </div>
        </div>

        <div className="settings-field">
            <div className="settings-field-label">Name</div>
            <div className="settings-field-value" onClick={doEditName}>
                {accountSettings.name}
            </div>
        </div>
    </div>);
}

export default SettingsFields;