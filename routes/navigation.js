const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById } = require('../controllers/navigationController');

// Route to get all rooms
router.get('/rooms', getAllRooms);

// Route to get room by ID
router.get('/room/:id', getRoomById);

module.exports = router;
