const express = require('express');
const session = require("express-session")
const {v4} = require("uuid")
const userRoute = require('./routes/userRoute');

const app = express()
require('dotenv').config()
app.use(express.json());

const oneDay =60 * 60 * 1000 * 24

app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:true,
    genid:()=>v4(),
    rolling:true,
    resave:false,
    cookie:{
        httpOnly:false,
        maxAge:oneDay
    }
}))




app.get('/',(req,res)=>{
    res.send('Welcome to connectVerse');
})

app.use('/',userRoute);


const PORT = process.env.PORT;



app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
})


