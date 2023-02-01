import { useEffect, useState } from "react";
import { LoginForm, RegisterForm } from "../components/Form";

function Auth({ handleLogin, handleRegister }) {
    const [info, setInfo] = useState({ username: "", email: "", password: "" });
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState(<LoginForm info={info} setInfo={setInfo} />);
    const [button, setButton] = useState(
        <>
        <button onClick={() => handleLogin(info)}>Login</button>
        <aside>Not registered? Click <a onClick={swapForm}>here</a> to register</aside>
        </>
    );

    useEffect(() => {
        console.log(mode);
    }, [info]);

    function swapForm() {
        if (mode === "register") {
            setMode("login");
            setForm(<LoginForm info={info} setInfo={setInfo} />);
            setButton(
                <>
                <button onClick={() => handleLogin(info)}>Login</button>
                <aside>Not registered? Click <a onClick={swapForm}>here</a> to register</aside>
                </>
            )
        } else {
            setMode("register");
            setForm(<RegisterForm info={info} setInfo={setInfo} />);
            setButton(
                <>
                <button onClick={() => handleRegister(info)}>Register</button>
                <aside>Looking for the login section? Click <a onClick={swapForm}>here</a></aside>
                </>
            );
        }
    }

    return (
        <section>
            <LoginForm info={info} setInfo={setInfo} />
            <button onClick={() => handleLogin(info)}>Login</button>
            {/* <aside>Not registered? Click <a onClick={swapForm}>here</a> to register</aside> */}

            <RegisterForm info={info} setInfo={setInfo} />
            <button onClick={() => handleRegister(info)}>Register</button>
            {/* <aside>Looking for the login section? Click <a onClick={swapForm}>here</a></aside> */}
        </section>
    )
}

export default Auth