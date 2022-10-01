// Routes
const express = require('express');
const router = express.Router();
const API = require('../controllers/api');

router.get('/', API.fetchAllPost);
router.get('/:id', API.fetchPostByID);

module.exports = router;