import { Link } from 'react-router-dom';

const BackBtn = () => {
    return (
        <Link to="/" className="nav-btn back">← Back</Link>
    )
}

const SettingsBtn = ({ user }) => {
    return (
        <Link to={`/user/${user.userID}/settings`} className="nav-btn settings">
            ⚙️ Settings
        </Link>
    )
}

const NavActions = ({ user }) => {
    return (
        <div className="nav-actions">
            <BackBtn />
            <SettingsBtn user={user} />
        </div>
    );
}

export default NavActions;