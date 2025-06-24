import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import api from "../../../../common/apiutils"

import SettingsView from "./SettingsView.jsx";

const SettingsViewMain = () => {
    const { id } = useParams();
    const [accountSettings, setAccountSettings] = useState(null);

    async function fetchUserSettings() {
        const settingsResponse = await api.get(`/account/getUserInformation?userID=${id}`);
        if (settingsResponse.status === "success") {
            setAccountSettings(settingsResponse.user);
        }
    }

    useEffect(() => {
        fetchUserSettings();
    }, [id]);

    return (accountSettings ?
        (<SettingsView accountSettings={accountSettings} refresh={fetchUserSettings} />)
        :
        (<div>Loading settings...</div>)
    );
}

export default SettingsViewMain;