const express = require('express')
const router = express.Router()
const {addRoom,updateRoom, deleteRoom, getAllRoom, getSingleRoom} = require('../controllers/roomController')
const {authMiddleware, admin} = require('../middleware/authMiddleware')


router.post('/room', authMiddleware, admin,  addRoom)
router.put('/room/:id', authMiddleware, admin, updateRoom)
router.delete('/room/:id', authMiddleware, admin, deleteRoom)

router.get('/rooms', authMiddleware, getAllRoom)
router.get('/room/:id', authMiddleware, getSingleRoom)

module.exports = router