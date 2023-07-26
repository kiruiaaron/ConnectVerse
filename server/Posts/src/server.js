const express = require('express');
const postRoute = require('./routes/postRoute');

const cors = require('cors')
require('dotenv').config()
const app = express();




app.use(express.json());

app.use(cors({
    origin:"http://localhost:3001",
    credentials:true,
    optionsSuccessStatus:200
}))

app.get('/',(req,res)=>{
    res.send('welcome to post center');
})

app.use('/',postRoute)
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})