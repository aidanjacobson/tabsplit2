import { usePrompt } from "./PromptProvider"

export const usePromptHandlers = () => {
    const showPrompt = usePrompt();

    const promptNumber = async (label, initialValue) => {
        const result = await showPrompt({ type: "number", label, defaultValue: initialValue });
        return typeof result === "number" ? result : null;
    }

    const promptText = async (label, initialValue) => {
        const result = await showPrompt({ type: "text", label, defaultValue: initialValue });
        return typeof result === "string" ? result : null;
    }

    return { promptNumber, promptText };
}