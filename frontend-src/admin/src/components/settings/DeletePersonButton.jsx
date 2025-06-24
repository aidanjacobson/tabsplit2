import api from "../../../../common/apiutils";

import { useNavigate } from "react-router-dom";

const DeletePersonButton = ({ accountSettings, refresh }) => {
    const navigate = useNavigate();

    async function verifyZeroBalance() {
        const userDetails = await api.get(`/user/get?userID=${accountSettings.userID}`);
        if (userDetails.status !== "success") {
            alert("Error fetching user details: " + userDetails.reason);
            return false;
        }
        if (userDetails.user.balance != 0) {
            alert("Cannot delete user with a non-zero balance. Please settle the balance first.");
            return false;
        }

        return true;
    }

    async function doDeletePerson() {
        let confirmed = window.confirm("Are you sure you want to delete this person? This action cannot be undone.");
        if (!confirmed) return;
        if (!await verifyZeroBalance()) return;

        const response = await api.post("/user/delete", {
            userID: accountSettings.userID
        });

        if (response.status !== "success") {
            alert("Error deleting person: " + response.reason);
            return;
        }

        navigate("/"); // back to home page
    }

    return (
        <div className="delete-person-button" onClick={doDeletePerson}>
            Delete Person
        </div>
    )
}

export default DeletePersonButton;