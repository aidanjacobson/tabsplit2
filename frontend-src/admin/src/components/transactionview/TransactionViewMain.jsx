import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import api from "../../../../common/apiutils"

import TransactionView from "./TransactionView.jsx";

const TransactionViewMain = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [user, setUser] = useState(null);

    async function fetchTransactionData() {
        const transactionResponse = await api.get(`/transaction/get?transactionID=${id}`);
        if (transactionResponse.status === "success") {
            setTransaction(transactionResponse.transaction);

            const userID = transactionResponse.transaction.userID;

            const userResponse = await api.get(`/user/get?userID=${userID}`);
            if (userResponse.status === "success") {
                setUser(userResponse.user);
            } else {
                alert("Failed to fetch user data: " + userResponse.message);
            }
        } else {
            alert("Failed to fetch transaction data: " + transactionResponse.message);
        }
    }

    useEffect(() => {
        fetchTransactionData();
    }, [id]);

    return (transaction && user ?
        (<TransactionView transaction={transaction} user={user} refresh={fetchTransactionData} />)
        :
        (<div>Loading transaction data...</div>)
    );
}

export default TransactionViewMain;