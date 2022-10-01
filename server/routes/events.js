const express = require('express');
const router = express.Router();
const eventAPI = require('../controllers/eventAPI');
const EventItems = require('../models/event')

router.get('/', eventAPI.fetchAllEvents);
router.get('/:id', eventAPI.fetchEventByID);
router.post('/', eventAPI.postEvent);
router.patch('/:id', eventAPI.patchEvent);
router.delete('/:id', eventAPI.deleteEvent);

module.exports = router;