import { useContext, useEffect } from "react"
import AuthContext from "./authContext"

const useAuthContext = () => {
    const value = useContext(AuthContext);

    useEffect(() => {
        console.log(value);
    }, [value])
    
    return value;
}

export default useAuthContext