import axiosInstance from './axiosInstance';
const _api = axiosInstance();

export default class API {
    static async validate() {
        try {
            const response = await _api.get('/');
            const data = Promise.resolve(response.data);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static async login(data) {
        try {
            const response = await _api.post('/auth/login', data);
            return Promise.resolve(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    static async logout() {
        try {
            const response = await _api.delete('/auth/logout');
            console.log(response);
            return Promise.resolve(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    static async register(data) {
        try {
            const response = await _api.post('/auth/register', data);
            return Promise.resolve(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    static async getItems() {
        const response = await _api.get('/app/item');
        return Promise.resolve(response.data);
    }
}