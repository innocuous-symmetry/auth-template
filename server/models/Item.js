class Item {
    name;
    description;
    created;
    modified;

    constructor(name, description) {
        this.name = name;
        this.description = description;

        this.created = new Date(Date.now()).toDateString();
        this.modified = new Date(Date.now()).toDateString();
    }

    async getAll() {

    }
}