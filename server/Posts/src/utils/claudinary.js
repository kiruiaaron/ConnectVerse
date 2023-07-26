require('dotenv').config();

const claudinary = require('cloudinary').v2; 

claudinary.config({
    cloud_name:process.env.CLAUDINARY_NAME,
    api_key:process.env.CLAUDINARY_API_KEY,
    api_secret:process.env.CLAUDINARY_API_SECRET,
})

module.exports={claudinary}