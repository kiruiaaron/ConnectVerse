const express = require('express');
const postRoute = require('./routes/postRoute');
require('dotenv').config()
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('welcome to post center');
})

app.use('/',postRoute)
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})