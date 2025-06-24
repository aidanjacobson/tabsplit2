import UserViewTransaction from "./UserViewTransaction";

const UserViewTransactions = ({ transactions }) => {
    return (
        <div className="user-view-transactions">
            <h2>
                {transactions.length > 0 ? "Transactions" : "No transactions found"}
            </h2>
            <div className="transactions-list">
                {transactions.map((transaction) =>
                    (<UserViewTransaction transaction={transaction} />)) }
            </div>
        </div>
    )
}

export default UserViewTransactions;