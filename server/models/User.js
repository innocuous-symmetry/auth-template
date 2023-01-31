module.exports = class User {
    username;
    email;
    password;
    created;
    modified;

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.created = new Date(Date.now()).toDateString();
        this.modified = new Date(Date.now()).toDateString();
    }
}