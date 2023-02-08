import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthContext from "../context/useAuthContext"
import API from "../util/API";
import Auth from "./Auth";
import Welcome from "./protected/Welcome";

function Home() {
    const [contents, setContents] = useState(<></>);
    const [update, setUpdate] = useState(false);
    const { user, setUser, token, setToken } = useAuthContext();
    const navigate = useNavigate();

    async function handleLogin(info) {
        if (!info.email || !info.password) return;
    
        const response = await API.login(info);
    
        setUser(response.user);
        setToken(response.token);

        setUpdate(!update);
    }
    
    async function handleLogout() {
        await API.logout();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUpdate(!update);
        
        navigate('/');
    }
    
    async function handleRegister(register) {
        if (!register.username || !register.email || !register.password) return;
        const response = await API.register(register);
        console.log(response);

        if (response.ok) {
            await API.login({ email: register.email, password: register.password });
        }

        setUpdate(!update);
    }

    useEffect(() => {
        setContents(user ? <Welcome handleLogout={handleLogout} /> : <Auth handleLogin={handleLogin} handleRegister={handleRegister} />)
    }, [token])

    return (
        <main>
            <h1>This is my auth testing app</h1>
            { contents }
        </main>
    )
}

export default Home