const Event = require("../models/event");
module.exports = class eventAPI {

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
        //res.send('Update event');
        const { id} = req.params
        try {
            const response = await Event.findByIdAndUpdate(id, req.body)
            if (!response) throw Error('Something went wrong')
            const updated = { ...response._doc, ...req.body }
            res.status(200).json(updated)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async deleteEvent(req, res) {
        Event.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).send(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
}