import api from "../../../../common/apiutils";

const LogoutButton = () => {
    function doLogout() {
        api.post("/account/logout");
        window.location.href = "/login"; // Redirect to login page after logout
    }

    return <div className="logout-button" onClick={doLogout}>Logout</div>;
}

export default LogoutButton;