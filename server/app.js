require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5500;

const connection = require('./db/connection');

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// db connection
connection.then(()=> {
    console.log('connected to db');
})

// routes prefix
app.use('/api/events', require('./routes/routes'));


// start server
app.listen(port, ()=> console.log(`Server running at http://localhost:${port}`));