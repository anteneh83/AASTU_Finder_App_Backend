const Room = require('../models/Room');

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};

// Get a room by ID
const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching room details' });
  }
};

module.exports = { getAllRooms, getRoomById };
