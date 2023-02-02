import { useNavigate } from "react-router-dom"

function Welcome({ user, handleLogout }) {
    const navigate = useNavigate();

    return (
        <section>
            <h2>Welcome, {user.username}!</h2>
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