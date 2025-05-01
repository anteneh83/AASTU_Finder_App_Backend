const Room = require('../models/Room')
const path = require('path')
const fs = require('fs')

// add a room
const addRoom = async (req, res) => {
    try {
        const { name, description, blockNumber, floor, coordinates } = req.body;
        const file = req.file;

        if (!name || !description || !blockNumber || !coordinates || !file) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const imagePath = path.join('roomImages', file.filename);   

        const newRoom = new Room({
            name,
            description,
            blockNumber,
            floor,
            coordinates: JSON.parse(coordinates),
            images: imagePath
        });

        await newRoom.save();
        res.status(200).json({ message: "room added successfully", room: newRoom });

    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
}

// get all room
const getAllRoom = async (req, res) =>{
    try{
        const room = await Room.find()
        res.json({room})
    } catch(error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
}

//get single room by id 
const getSingleRoom = async (req, res) =>{
    try{
        const room = await Room.findById(req.params.id)
        if(!room) {return res.status(400).json({message: "room not found with this id"})}
    
        res.json({room})
    } catch(error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
}


const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (req.file) {
      const newImage = req.file;

      if (room.images) {
        const oldImagePath = path.join(__dirname, '..', 'roomImages', path.basename(room.images));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      room.images = newImage.filename;
    }

    const { name, description, blockNumber, floor, coordinates } = req.body;

    room.name = name ?? room.name;
    room.description = description ?? room.description;
    room.blockNumber = blockNumber ?? room.blockNumber;
    room.floor = floor ?? room.floor;

    if (coordinates) {
      let parsedCoordinates;
      try {
        parsedCoordinates = typeof coordinates === 'string' ? JSON.parse(coordinates) : coordinates;
        room.coordinates.x = parsedCoordinates.x ?? room.coordinates.x;
        room.coordinates.y = parsedCoordinates.y ?? room.coordinates.y;
      } catch (err) {
        return res.status(400).json({ message: "Invalid coordinates format" });
      }
    }

    await room.save();
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send("Server error");
  }
};



// Delete a room
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(400).json({ message: "room not found" });
        }

        // Delete local image file
        if (room.images) {
            const imagePath = path.join(__dirname, '..', 'roomImages', path.basename(room.images));
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                }
            });
        }

        await room.deleteOne();
        res.status(200).json({ message: "room deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};


// search a room by name, blockNumber, or descriptions
const searchRoom = async (req, res) =>{
   try {
        const {query} = req.query

        if(!query) {
            return res.status(400).json({message: "query parameter is required"})
        }

        const isNumber = !isNaN(query)

        let searchCriteria = isNumber 
            ? {blockNumber: Number(query)}
            : {
                $or: [
                    {name:{ $regex: query, $options: 'i'}},
                    {description: {$regex: query, $options: 'i'}}
                ]
            }

        const rooms = await Room.find(searchCriteria)
        res.status(200).json(rooms)
    
    } catch(error){
        console.log(error)
        res.status(500).send("server error")
    }
}

module.exports = {
    addRoom,
    updateRoom, 
    deleteRoom,
    getAllRoom,
    getSingleRoom,
    searchRoom
}

