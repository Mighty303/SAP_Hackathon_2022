module.exports = class API {
    // fetch all posts
    static async fetchAllEvents(req, res) {
        res.send('Hello from API');
    }

    // fetch post by ID
    static async fetchEventByID(req, res) {
        res.send('Fetch Post by ID');
    }

    static async postEvent(req, res) {
        res.send('Post new event');
    }

    static async patchEvent(req, res) {
        res.send('Update event');
    }

    static async deleteEvent(req, res) {
        res.send('Delete event');
    }
}