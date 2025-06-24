import api from "../../../../common/apiutils";

import "./newtabbtn.scss";

import { usePromptHandlers } from "../prompt/prompt";

const StartNewTabButton = ({ refresh }) => {
    const { promptText } = usePromptHandlers();

    async function startNewTab() {
        const tabName = await promptText("Enter name of person");
        const result = await api.post('/user/add', { name: tabName });

        refresh();

        // TODO: switch to the new tab
    }

    return (
        <div className="start-new-tab-button" onClick={startNewTab}>Start New Tab</div>
    );
}

export default StartNewTabButton;