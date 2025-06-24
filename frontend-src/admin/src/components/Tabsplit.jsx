import { useState, useEffect } from 'react';

import api from "../../../common/apiutils.js";

import TabsplitHeader from './header/TabsplitHeader.jsx';

import './Tabsplit.scss';

const Tabsplit = () => {
    const [adminName, setAdminName] = useState('[name]');
    const [totalBalance, setTotalBalance] = useState(0);

    const [allUsers, setAllUsers] = useState([]);

    async function loadData() {
        const getNamesResponse = await api.get('/account/getNames');
        setAdminName(getNamesResponse.admin);

        const getTotalBalanceResponse = await api.get('/transaction/getTotalBalance');
        setTotalBalance(getTotalBalanceResponse.balance);

        const getAllUsersResponse = await api.get('/user/getAll');
        const usersArray = getAllUsersResponse.users;

        // we need to move anyone with a balance of 0 to the end of the array
        // maintain order otherwise
        const nonZeroBalanceUsers = usersArray.filter(user => user.balance != 0);
        const zeroBalanceUsers = usersArray.filter(user => user.balance == 0);
        const ordered = nonZeroBalanceUsers.concat(zeroBalanceUsers);
        setAllUsers(ordered);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="tabsplit">
            <TabsplitHeader name={adminName} balance={totalBalance} refresh={loadData} />
        </div>
    )
}

export default Tabsplit;