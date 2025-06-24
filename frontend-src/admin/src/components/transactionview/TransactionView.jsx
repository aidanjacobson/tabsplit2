import './TransactionView.scss';

import TransactionViewHeader from './TransactionViewHeader';
import TransactionInfo from './TransactionInfo';

import api from "../../../../common/apiutils";

import { useNavigate } from "react-router-dom";

const DeleteTransactionButton = ({ transaction, user, refresh }) => {
    const navigate = useNavigate();

    async function deleteTransaction() {
        const confirmed = window.confirm("Are you sure you want to delete this transaction? This action cannot be undone.");
        if (!confirmed) return;

        const deleteResponse = await api.post("/transaction/delete", {
            transactionID: transaction.id
        });

        if (deleteResponse.status != "success") {
            alert("Failed to delete transaction: " + deleteResponse.reason);
            return;
        }
        navigate(`/user/${user.userID}`);
    }

    return <div className="delete-transaction-button" onClick={deleteTransaction}>
        Delete Transaction
    </div>
}

const TransactionView = ({ transaction, user, refresh }) => {
    return <div className="transaction-view">
        <TransactionViewHeader transaction={transaction} user={user} refresh={refresh} />
        <TransactionInfo transaction={transaction} />
        <DeleteTransactionButton transaction={transaction} user={user} refresh={refresh} />
    </div>
}

export default TransactionView;