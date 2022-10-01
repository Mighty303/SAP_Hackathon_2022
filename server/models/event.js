// models
const mongoose = require('mongoose');

const event = mongoose.Schema({
    title: String, 
    spots: integer,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', event);