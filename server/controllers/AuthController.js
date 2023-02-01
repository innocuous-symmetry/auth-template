const bcrypt = require('bcrypt');

const ControllerResponse = require('./ControllerResponse');
const User = require('../models/User');

module.exports = class AuthController {
    static async getOne(id) {
        const user = await User.getOne(id);

        const ok = user !== null;
        const data = ok ? user : ("No user found with id " + id);
        const code = ok ? 200 : 404;

        return new ControllerResponse(ok, data, code);
    }

    static async getOneByEmail(email) {
        const user = await User.getOneByEmail(email);

        const ok = user !== null;
        const data = ok ? user : ("No user found with email" + email);
        const code = ok ? 200 : 404;

        return new ControllerResponse(ok, data, code);
    }

    static async getAll() {
        const list = await User.getAll();

        const ok = list.length > 0;
        const data = ok ? list : "No user data found";
        const code = ok ? 200 : 404;

        return new ControllerResponse(ok, data, code);
    }

    static async create() {

    }

    /**
     * 
     * @param {{ email: string, password: string }} userData - data to compare against encrypted DB entry
     * @returns { ControllerResponse | null } controller response, or null failing all else
     */
    static async login(userData) {
        try {
            const potentialUser = await AuthController.getOneByEmail(userData.email);

            if (potentialUser.ok) {
                const match = await bcrypt.compare(userData.password, potentialUser.data.password);
                return new ControllerResponse(match, (match ? potentialUser : "Invalid credentials"), (match ? 200 : 403));
            } else {
                return new ControllerResponse(false, "No user found with these credentials", 404);
            }
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    static async logout() {

    }

    /**
     * ## Register method
     * 
     * @param {{ username: string, password: string, email: string }} data - provided user data
     * @returns { ControllerResponse } controller response including status codes
     */
    static async register(userData) {
        try {
            const potentialUser = await AuthController.getOneByEmail(userData.email);
            if (potentialUser.ok) {
                return new ControllerResponse(false, ("User already registered with email " + userData.email), 401);
            }
            
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(userData.password, salt);

            const newUser = new User(userData.username, userData.email, hash);
            const result = await User.create(newUser);

            return new ControllerResponse(result.length > 0, result, (result.length > 0 ? 201 : 400));
        } catch (error) {
            console.log(error);
        }
    }
}