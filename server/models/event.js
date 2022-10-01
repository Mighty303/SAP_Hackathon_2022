const mongoose = require('mongoose');

const event = mongoose.Schema({
    title: {type: String, default: 'New Event'}, 
    capacity: {type: Number, default: 2},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', event);