const LoginCheckbox = ({ label, checked, setChecked }) => {
    return (
        <div class="login-checkbox">
            <label>
                <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
                {label}
            </label>
        </div>
    )
};

export default LoginCheckbox;