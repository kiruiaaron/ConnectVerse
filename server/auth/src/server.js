const express = require('express');
const session = require("express-session")
const {v4} = require("uuid")
const sql = require('mssql')
const config = require('./config/config')
const RedisStore = require('connect-redis').default
const {createClient}= require("redis")
const userRoute = require('./routes/userRoute');

const app = express()
require('dotenv').config()
app.use(express.json());



const pool= new sql.ConnectionPool(config)
console.log(pool)
async function startUp(){
    try {
        await pool.connect();
        console.log("App connected to database")

        const redisClient = createClient();
        redisClient.connect()

        console.log("connected to redis")

        const redisStore = new RedisStore({
            client:redisClient,
            prefix:""
        })
        const oneDay =60 * 60 * 1000 * 24

        app.use(session({
            store:redisStore,
            secret:process.env.SECRET,
            saveUninitialized:true,
            genid:()=>v4(),
            rolling:true,
            resave:false,
            unset:'destroy',
            cookie:{
                httpOnly:false,
                maxAge:oneDay
            }
        }))


        app.use((req,res,next)=>{req.pool =pool,next();})

        app.get('/',(req,res,next)=>{
            let cont = true;
            if(cont){
                next();
            }else{
                res.send("error")
            }
        },
        (req,res)=>{
            res.send("ok")
        })
        
        app.use('/',userRoute);
        
        
        const PORT = process.env.PORT;
        
        
        
        app.listen(PORT,()=>{
            console.log(`server listening at port ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}







startUp();

