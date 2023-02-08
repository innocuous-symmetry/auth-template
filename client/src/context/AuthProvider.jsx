import { useEffect, useState } from "react"
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    const value = { user, setUser, token, setToken }

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;