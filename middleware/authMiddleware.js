const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async(req, res, next) =>{
    const authHeader = req.header('Authorization')

    if( !authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: "no token, authorization denied"})
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.user.id).select('-password')
        next()
    } catch(err) {
        res.status(401).json({message: "token is not valid"})
    }

}

const admin = (req, res, next) =>{
    if (req.user && req.user.role === 'admin') {
        next()
      } else if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: user not found' })
      } else {
        return res.status(403).json({ message: 'Access denied: not an admin' })
      }
}


module.exports = {authMiddleware, admin}