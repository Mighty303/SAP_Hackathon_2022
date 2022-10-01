const mongoose = require('mongoose');

const event = mongoose.Schema({
    title: {type: String, required: true},
    capacity: {type: Number, default: 2, required: true},
    //password: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', event);