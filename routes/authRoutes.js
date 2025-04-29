const express = require('express')
const router =  express.Router();
const {registerUser, userLogin }  =  require('../controllers/authController')


router.post('/register', registerUser)
router.get('/login', userLogin)

module.exports = router

