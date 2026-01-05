import formatMoney from "../../../../common/formatmoney";

import EditActions from "./EditActions.jsx";

import { useNavigate } from "react-router-dom";

const BackButton = ({ user }) => {
    const navigate = useNavigate();

    const didClick = () => {
        navigate(`/user/${user.userID}`);
    }

    return (
        <div className="back-btn" onClick={didClick}>
            ← Back
        </div>
    )
}

const TransactionViewHeader = ({ transaction, user, refresh }) => {
    const amount = formatMoney(transaction.amount);

    let statusText = "0 balance";
    if (transaction.amount > 0) {
        statusText = `${user.name} owes you ${amount}`;
    }
    else if (transaction.amount < 0) {
        statusText = `You owe ${user.name} ${amount}`;
    }

    const balance = formatMoney(transaction.balanceAtTime, { signNegative: true });

    return (
        <div className="transaction-view-header">
            <div className="back-btn-container">
                <BackButton user={user} />
            </div>
            <h1>Transaction with {user.name}</h1>
            <h3>{statusText}</h3>
            <h3>Running total: {balance}</h3>
            <EditActions transaction={transaction} refresh={refresh} />
        </div>
    )
}

export default TransactionViewHeader;