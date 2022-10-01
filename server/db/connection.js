require('dotenv').config();
const mongoose = require("mongoose");
//const user = process.env.USER;
//const pw = process.env.PW;
//const dbName = process.env.DB_NAME;
const user ='martinwong303';
const pw ='3weGHcxE0RV2m1EQ';
const dbName = 'Hackathon'
let mongoDB = `mongodb+srv://${user}:${pw}@cluster0.icijb.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});