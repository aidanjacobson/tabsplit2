import formatMoney from "../../../../common/formatmoney";
import formatDate from "../../../../common/formatdate";

import { useNavigate } from "react-router-dom";

const UserViewTransaction = ({ transaction }) => {
    const navigate = useNavigate();

    let balanceClass = "even";
    if (transaction.amount < 0) {
        balanceClass = "negative";
    }
    else if (transaction.amount > 0) {
        balanceClass = "positive";
    }

    function formatHeader() {
        const amount = formatMoney(transaction.amount, { signNegative: true, signPositive: true });
        const date = formatDate(transaction.timestamp);

        return `${amount} - ${date}`;
    }

    function viewTransaction() {
        // Navigate to the transaction view page
        navigate(`/transaction/${transaction.id}`);
    }

    return <div className={`user-view-transaction ${balanceClass}`} onClick={viewTransaction}>
        { formatHeader() }
        <br />
        {transaction.comment}
    </div>;
}

export default UserViewTransaction;