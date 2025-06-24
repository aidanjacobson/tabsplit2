import UserTile from './UserTile';

import "./UserList.scss";

const UserList = ({ allUsers }) => {
    return (
        <div className="user-list">
            {allUsers.map(user => (<UserTile user={user} />)) }
        </div>
    )
}

export default UserList;