import { useState } from "react";
import { LoginForm, RegisterForm } from "../components/Form";

function Auth({ handleLogin, handleRegister }) {
    const [info, setInfo] = useState({ email: "", password: "" });
    const [register, setRegister] = useState({ username: "", email: "", password: "" })

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