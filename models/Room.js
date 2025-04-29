const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  blockNumber: { type: Number, required: true },
  floor: { type: Number, default: 'NaN'},
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});

module.exports = mongoose.model('Room', roomSchema);
