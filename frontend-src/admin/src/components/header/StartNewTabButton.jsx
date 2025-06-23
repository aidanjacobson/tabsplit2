import api from "../../../../common/apiutils";

import "./newtabbtn.scss";

import { usePromptHandlers } from "../prompt/prompt";

const StartNewTabButton = () => {
    const { promptText } = usePromptHandlers();

    async function startNewTab() {
        const tabName = await promptText("Enter name of person");
    }

    return (
        <div className="start-new-tab-button" onClick={startNewTab}>Start New Tab</div>
    );
}

export default StartNewTabButton;