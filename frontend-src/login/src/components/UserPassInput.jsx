const UserPassInput = ({ user, setUser, pass, setPass }) => {
    return (
        <div className="user-pass-input">
            <input type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required />

            <input type="password"
                id="pin"
                name="pin"
                placeholder="PIN"
                inputMode="numeric"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required />
        </div>
    );
};

export default UserPassInput;