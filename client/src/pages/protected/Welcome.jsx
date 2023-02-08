import { useNavigate } from "react-router-dom"
import API from "../../util/API";
import useAuthContext from "../../context/useAuthContext";

function Welcome() {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useAuthContext();

    async function handleLogout() {
        await API.logout();
        setUser(null);
        setToken(null);
        navigate('/');
    }

    return (
        <section>
            <h2>Welcome, {user?.username}!</h2>
            <hr />

            <h3>Check out some cool protected actions:</h3>
            <div>
                <button onClick={() => navigate('/item')}>View restricted content</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </section>
    )
}

export default Welcome