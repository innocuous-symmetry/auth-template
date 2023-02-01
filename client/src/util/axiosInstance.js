import axios from 'axios'

const apiUrl = import.meta.env.VITE_APIURL;

export default function axiosInstance() {
    if (!apiUrl) {
        throw new Error("API URL not found");
    }

    return axios.create({ baseURL: apiUrl });
}