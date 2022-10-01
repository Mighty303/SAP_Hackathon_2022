const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: {type: String, required: true}, 
    past_events: [],

});

module.exports = mongoose.model('User', user);