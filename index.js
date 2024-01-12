import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose" 
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()



const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.url)
        console.log(`connected to ${mongoose.connection.host}`)
    }catch(err){
        console.log(err)
    }
}


app.use(cors({
    origin: process.env.cors,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())


//route import
import auth from "./routes/auth.js"


//route path
app.use('/api', auth)


connectdb()



app.listen(process.env.port,()=>{
    console.log(`⚙️ server is running on port ${process.env.port}`)
})
