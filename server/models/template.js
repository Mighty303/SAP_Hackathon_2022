// models
const mongoose = require('mongoose');

const template = mongoose.Schema({
    title: String, 
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', template);