const express = require('express')
const router = express.Router()
const {addRoom,updateRoom, deleteRoom, getAllRoom, getSingleRoom, searchRoom} = require('../controllers/roomController')
const {authMiddleware, admin} = require('../middleware/authMiddleware')
const upload = require('../middleware/multer')

// admin role only
router.post('/room', authMiddleware, admin, upload.single('image'), addRoom)
router.put('/room/:id', authMiddleware, admin,upload.single('image'), updateRoom)
router.delete('/room/:id', authMiddleware, admin, deleteRoom)

// for both role
router.get('/rooms', authMiddleware, getAllRoom)
router.get('/room/search', authMiddleware, searchRoom)
router.get('/room/:id', authMiddleware, getSingleRoom)

module.exports = router