import axios from 'axios'
import jwt_decode from 'jwt-decode'

const apiUrl = import.meta.env.VITE_APIURL;

const instance = axios.create({
    baseURL: apiUrl
});

instance.interceptors.response.use((res) => {
    if (res?.data.token) {
        document.cookie = `token=${res.data.token}`;

        return {
            token: res.data.token,
            user: jwt_decode(res.data.token).user,
            data: res.data.data || null
        }
    } else {
        return {
            data: res?.data || null
        }
    }
}, (err) => {
    return Promise.reject(err);
})

export default instance;