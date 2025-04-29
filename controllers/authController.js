const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) =>{
    const {name, email, password, role} = req.body
    // first check the user is already exist or not
    try {
        let user = await User.findOne({email})
        if(user) {return res.status(400).json({message: "user already exist!"})}

        // if not, create instance and register  the user
        user = new User({
            name, 
            email, 
            password, 
            role: role || 'user'})

        // encrypt the user password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // save the new user
        await user.save()
        return res.status(201).json({message: "user successfully registered"})
    } catch(err) {
        console.log(err)
        return res.status(500).send("server error")
    }

}

const userLogin = async (req, res) =>{
    const {email, password} = req.body

    // check the user is exist
    try {
        let user = await User.findOne({email})
        if(!user) { return res.status(400).json({message: "Invalid credential"})}

        // check the password is match
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) { return res.status(400).json({message: "invalid credential"})}

        // generate jwt token
        const payLoad = {
            user: {
                id: user.id,
                role: user.role
            }
        }
        
        
        // sign the jwt token
        jwt.sign(
            payLoad,
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) throw err
                res.json({token})
            }
        )
    } catch(err) {
        console.log(err)
        return res.status(500).send('server error')
    }
}



module.exports = {registerUser, userLogin}