import api from "../../../../common/apiutils";

import { useNavigate } from "react-router-dom";

import "./newtabbtn.scss";

import { usePromptHandlers } from "../prompt/prompt";

const StartNewTabButton = ({ refresh }) => {
    const { promptText } = usePromptHandlers();

    const navigate = useNavigate();

    async function startNewTab() {
        const tabName = await promptText("Enter name of person");

        if (!tabName) return;

        const result = await api.post('/user/add', { name: tabName });

        refresh();

        if (result.status == "success") {
            navigate(`/user/${result.newUserID}`);
        } else {
            alert("Error creating new tab: " + result.reason);
        }
    }

    return (
        <div className="start-new-tab-button" onClick={startNewTab}>Start New Tab</div>
    );
}

export default StartNewTabButton;