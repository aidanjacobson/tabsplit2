import UserViewHeader from './UserViewHeader';
import UserViewTransactions from './UserViewTransactions';

import './UserView.scss';

const UserView = ({ user, transactions, refresh }) => {
    return (
        <div className="user-view">
            <UserViewHeader user={user} refresh={refresh} />
            <UserViewTransactions transactions={transactions} />
        </div>
    )
}

export default UserView;