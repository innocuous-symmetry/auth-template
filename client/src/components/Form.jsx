export function LoginForm({ info, setInfo }) {
    return (
        <form>
            <div>
                <label>Email</label>
                <input type="text" onChange={(e) => setInfo({ ...info, email: e.target.value })} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
            </div>
        </form>
    )
}

export function RegisterForm({ info, setInfo }) {
    return (
        <form>
            <div>
                <label>Username</label>
                <input type="text" onChange={(e) => setInfo({ ...info, username: e.target.value })} />
            </div>
            <div>
                <label>Email</label>
                <input type="text" onChange={(e) => setInfo({ ...info, email: e.target.value })} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
            </div>
        </form>
    )
}