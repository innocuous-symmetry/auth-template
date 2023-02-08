import { useState } from "react";
import { LoginForm, RegisterForm } from "../components/Form";
import useAuthContext from "../context/useAuthContext";
import API from "../util/API";

function Auth({ handleLogin, handleRegister }) {
    const [info, setInfo] = useState({ email: "", password: "" });
    const [register, setRegister] = useState({ username: "", email: "", password: "" })

    const { setUser, setToken } = useAuthContext();

    async function handleLogin() {
        if (!info.email || !info.password) return;
    
        const response = await API.login(info);
    
        setUser(response.user);
        setToken(response.token);
    }

    return (
        <section>
            <LoginForm info={info} setInfo={setInfo} />
            <button onClick={() => handleLogin(info)}>Login</button>

            <RegisterForm info={register} setInfo={setRegister} />
            <button onClick={() => handleRegister(register)}>Register</button>
        </section>
    )
}

export default Auth