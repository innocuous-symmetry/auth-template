import axios from 'axios'

const apiUrl = import.meta.env.VITE_APIURL;

export default axios.create({
    baseURL: "http://localhost:8080"
})