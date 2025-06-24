import api from "../../../../common/apiutils";

import { usePromptHandlers } from "../prompt/prompt";

const FinancialActions = ({ user, refresh }) => {
    const { promptNumber, promptText } = usePromptHandlers();

    async function initiateTransaction(userID, actionType) {
        /*
         action type is either "cover" or "getcovered"
         in case of cover:
         - "How much do you want to pay {name}?"
         in case of getcovered:
         - "How much do you want to get paid by {name}?"
         If amount comes back null, cancel the operation

         either way: "Enter a label for this transaction:" can be empty/null
         then submit the transaction. If we are getcovered, we need to negate the amount
        */

        const question =
            actionType === "cover" ?
                `How much do you want to pay ${user.name}?` :
                `How much do you want to get paid by ${user.name}?`;

        let amount = await promptNumber(question);
        if (amount === null || amount == 0) {
            return; // User cancelled the operation
        }

        const label = await promptText("Enter a label for this transaction:");
        if (label === null) {
            return; // User cancelled the operation
        }

        if (actionType === "getcovered") {
            // Negate the amount for getcovered action
            amount = -amount;
        }

        // Submit the transaction
        const response = await api.post("/transaction/submit", {
            userID: user.userID,
            amount: amount,
            comment: label
        });

        if (response.status == "success") {
            refresh();
        } else {
            alert("Transaction failed: " + response.message);
        }
    }

    return (
        <div className="financial-actions">
            <div className="financial-action cover" onClick={() => initiateTransaction(user.userID, "cover")}>
                Cover
            </div>
            <div className="financial-action getcovered" onClick={() => initiateTransaction(user.userID, "getcovered")}>
                Get Covered
            </div>
        </div>
    )
}

export default FinancialActions;