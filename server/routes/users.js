const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const EventItems = require('../models/event')

// router.get('/', API.fetchAllEvents);
// router.get('/:id', API.fetchEventByID);
// router.post('/', API.postEvent);
// router.patch('/:id', API.patchEvent);
// router.delete('/:id', API.deleteEvent);

module.exports = router;