const express =  require('express');
const userRoute = require('./routes/userRoute');
const app = express()
require('dotenv').config()


app.use(express.json())







app.use('/',userRoute)
const PORT = process.env.PORT 
app.get('/',(req,res)=>{
    res.send('Welcome to  ConnectVerse')
})

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
