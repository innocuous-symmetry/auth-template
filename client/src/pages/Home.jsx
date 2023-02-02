import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import API from "../util/API";
import Auth from "./Auth";
import Welcome from "./protected/Welcome";

function Home() {
    const [user, setUser] = useState(null);
    const [contents, setContents] = useState(<></>);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(info) {
        if (!info.email || !info.password) return;
    
        const response = await API.login(info);
        const user = jwt_decode(response.token);
    
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response.token);
    
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
        let item = localStorage.getItem('user');
        if (item) {
            item = JSON.parse(item);
            setUser(item.user);
        }
    }, [update])

    useEffect(() => {
        setContents(user ? <Welcome user={user} handleLogout={handleLogout} /> : <Auth handleLogin={handleLogin} handleRegister={handleRegister} />)
    }, [user, update])

    return (
        <main>
            <h1>This is my auth testing app</h1>
            { contents }
        </main>
    )
}

export default Home