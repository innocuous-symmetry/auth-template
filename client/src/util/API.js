import { default as _api } from './axiosInstance';

export default class API {
    static async validate(token) {
        try {
            const response = await _api.get('/', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + token)
                }
            });
            const data = Promise.resolve(response);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static async login(data) {
        try {
            const response = await _api.post('/auth/login', data);
            console.log(response);
            return Promise.resolve(response);
        } catch(err) {
            console.log(err);
        }
    }

    static async logout() {
        try {
            const response = await _api.delete('/auth/logout');
            console.log(response);

            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            console.log(document.cookie);
            return null;
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

    static async getItems(token) {
        const response = await _api.get('/app/item', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return Promise.resolve(response.data);
    }

    static async getOneItem(id, token) {
        const response = await _api.get(`/app/item/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": ("Bearer " + token)
            }
        });
        return Promise.resolve(response.data);
    }
}