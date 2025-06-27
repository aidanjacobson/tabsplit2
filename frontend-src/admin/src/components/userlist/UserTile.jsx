import { Link } from 'react-router-dom';

import formatMoney from "../../../../common/formatmoney.js";

const UserTile = ({ user }) => {

    let balanceClass = "even";
    if (user.balance < 0) balanceClass = "negative";
    if (user.balance > 0) balanceClass = "positive";
    let totalClass = "user-tile " + balanceClass;

    let formattedBalance = formatMoney(user.balance, { signNegative: true });

    return (
        <Link to={`/user/${user.userID}`} className="user-link">
            <div className={totalClass}>
                <h3>{user.name}</h3>
                <p>{formattedBalance}</p>
            </div>
        </Link>
    )
}

export default UserTile;