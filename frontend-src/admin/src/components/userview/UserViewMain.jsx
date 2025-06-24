import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import api from "../../../../common/apiutils"

import UserView from './UserView.jsx';

const UserViewMain = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userTransactions, setUserTransactions] = useState([]);


    async function fetchUserData() {
        const userResponse = await api.get(`/user/get?userID=${id}`);
        if (userResponse.status == "success") {
            setUser(userResponse.user);
        }

        const transactionsResponse = await api.get(`/transaction/getTransactions?userID=${id}`);
        if (transactionsResponse.status == "success") {
            setUserTransactions(transactionsResponse.transactions);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [id]);

    return ( user && userTransactions ?
        (<UserView user={user} transactions={userTransactions} refresh={fetchUserData} />)
        :
        (<div>Loading user data...</div>)
    )
}

export default UserViewMain;