const Event = require("../models/event");
module.exports = class API {

    // fetch all posts
    static async fetchAllEvents(req, res) {
        //res.send('Hello from API');
        try {
            const posts = await Event.find()
            if(!posts) throw new Error('No bucketListItems') 
            /*
            const sorted = posts.sort((a,b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
            */
            //res.status(200).json(sorted)
            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json({message: error.message})
        }
    }

    // fetch post by ID
    static async fetchEventByID(req, res) {
        res.send('Fetch Post by ID');
    }

    static async postEvent(req, res) {
        const newEvent = new Event(req.body)
        try {
            const posts = await newEvent.save()
            if (!posts) throw new Error('Something went wrong saving the bucketListItem')
            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json({ message: error.message })
        }
        //res.send('Post new event');
    }

    static async patchEvent(req, res) {
        res.send('Update event');
    }

    static async deleteEvent(req, res) {
        res.send('Delete event');
    }
}