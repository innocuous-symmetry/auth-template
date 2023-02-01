module.exports = class ControllerResponse {
    ok;
    data;
    code;

    constructor(ok, data, code) {
        this.ok = ok;
        this.data = data;
        this.code = code;
    }
}