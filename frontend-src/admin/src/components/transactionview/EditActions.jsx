import { usePromptHandlers } from "../prompt/prompt";

import api from "../../../../common/apiutils";

const EditAmountButton = ({ transaction, refresh }) => {
    const { promptNumber } = usePromptHandlers();

    async function doEditAmount() {
        const oldAmount = transaction.amount;
        const newAmount = await promptNumber("Enter the new amount for this transaction:", oldAmount);
        if (newAmount === null || newAmount === oldAmount) return; // User cancelled or no change

        const editResult = await api.post("/transaction/edit", {
            transactionID: transaction.id,
            amount: newAmount
        })

        if (editResult.status == "success") {
            refresh();
        } else {
            console.error("Failed to edit transaction amount:", editResult.error);
            alert("Failed to edit transaction amount. Please try again.");
        }
    }

    return (
        <div className="edit-action edit-amount" onClick={doEditAmount}>
        Edit Amount
        </div>
    )
}

const EditLabelButton = ({ transaction, refresh }) => {
    const { promptText } = usePromptHandlers();

    async function doEditLabel() {
        const oldLabel = transaction.comment || "";
        const newLabel = await promptText("Enter a new label for this transaction:", oldLabel);
        if (newLabel === null || newLabel === oldLabel) return; // User cancelled or no change
        const editResult = await api.post("/transaction/edit", {
            transactionID: transaction.id,
            comment: newLabel
        })
        if (editResult.status == "success") {
            refresh();
        } else {
            console.error("Failed to edit transaction label:", editResult.error);
            alert("Failed to edit transaction label. Please try again.");
        }
    }

    return (
        <div className="edit-action edit-label" onClick={doEditLabel}>
            Edit Label
        </div>
    )
}

const EditActions = ({ transaction, refresh }) => {
    return (
        <div className="edit-actions">
            <EditAmountButton transaction={transaction} refresh={refresh} />
            <EditLabelButton  transaction={transaction} refresh={refresh} />
        </div>
    )
}

export default EditActions;