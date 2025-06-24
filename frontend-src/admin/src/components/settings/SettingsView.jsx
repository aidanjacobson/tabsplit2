import './SettingsView.scss';

import { useNavigate } from "react-router-dom";

import SettingsFields from "./SettingsFields";
import DeletePersonButton from "./DeletePersonButton";

const BackButton = ({ accountSettings }) => {
    const navigate = useNavigate();
    function goBack() {
        navigate(`/user/${accountSettings.userID}`);
    }

    return <div className="back-button-container">
        <div className="back-button" onClick={goBack}>
            ← Back
        </div>
    </div>
}

const SettingsView = ({ accountSettings, refresh }) => {
    return <div className="settings-view">
        <BackButton accountSettings={accountSettings} />
        <h1>Settings for {accountSettings.name}</h1>
        <p>Click any field to edit it.</p>

        <SettingsFields accountSettings={accountSettings} refresh={refresh} />
        <DeletePersonButton accountSettings={accountSettings} refresh={refresh} />
    </div>
}

export default SettingsView;