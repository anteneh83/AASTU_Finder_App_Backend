const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const roomRoutes = require('./routes/roomRoutes')
require('dotenv').config()

const start = async () =>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

  } catch(err){
    console.log('failed to connect', err)
  }
}

start()
const app = express();
app.use(cors());
app.use(express.json()); 
// for registration and login
app.use('/api/auth', authRoutes);
// to validate the token
app.use('/api', roomRoutes);



