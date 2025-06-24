import formatMoney from "../../../../common/formatMoney";

import NavActions from './NavActions.jsx';
import FinancialActions from "./FinancialActions";

const UserViewHeader = ({ user, refresh }) => {
    const formattedBalance = formatMoney(user.balance, { signNegative: true });

    return (
        <div className="user-view-header">
            <NavActions user={user} />
            <h1>{user.name}</h1>
            <div className="user-balance">{formattedBalance}</div>
            <FinancialActions user={user} refresh={refresh} />
        </div>
    )
}

export default UserViewHeader;