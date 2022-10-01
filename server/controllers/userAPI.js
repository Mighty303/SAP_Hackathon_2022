const Event = require("../models/event");
module.exports = class userAPI {

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
        res.send('Patch new event')
    }

    static async deleteUser(req, res) {
        Event.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).send(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
}