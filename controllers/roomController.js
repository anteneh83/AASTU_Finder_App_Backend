const Room = require('../models/Room')

// add a room
const addRoom = async (req, res) => {
    try{
        const {name, description, blockNumber, floor, coordinates} = req.body
        if(!name || !description || !blockNumber || !coordinates) {
            return res.status(400).json({message: "fields should have a value"})
        }

        const newRoom = new Room({
            name,
            description,
            blockNumber,
            floor, 
            coordinates
        })

        await newRoom.save()
        res.status(200).json({message: "room added successfully"})

    } catch(error){
        console.log(error)
        res.status(500).send("server error")
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
// update the room
const updateRoom = async (req, res) =>{
    try {
        const {name, description, blockNumber, floor, coordinates} = req.body
        const room = await Room.findById(req.params.id) 

        room.name = name || room.name,
        room.description =  description || room.description,
        room.blockNumber = blockNumber || room.blockNumber,
        room.floor = floor || room.floor,
        room.coordinates = coordinates || room.coordinates        
        
        await room.save()
        res.status(200).json({message: "room updated successfully"})
    } catch(error){
        console.log(error)
        res.status(500).send("server error")
    }
}

//delete single room
const deleteRoom = async (req, res) =>{
    try{
        const room = await Room.findById(req.params.id)
        if(!room) { return res.status(400).json({message: "room not found"})}

        await room.deleteOne()
        res.status(200).json({message: "room deleted successfully"})
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
    getSingleRoom
}

