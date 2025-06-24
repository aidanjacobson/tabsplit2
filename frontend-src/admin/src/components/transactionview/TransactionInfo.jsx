import formatMoney from "../../../../common/formatMoney";
import formatDate from "../../../../common/formatdate";

const TransactionInfo = ({ transaction }) => {
    const date = formatDate(transaction.timestamp);
    const amount = formatMoney(transaction.amount, { signNegative: true, signPositive: true });
    const label = transaction.comment ? `"${transaction.comment}"` : "";

    return (
        <div className="transaction-info">
            <h2>{date}</h2>
            <h1>{amount}</h1>
            <h1>{label}</h1>
        </div>
    )
}

export default TransactionInfo;