import express from "express"
import { configDotenv } from "dotenv"
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"

configDotenv() // load env variables

const app = express()

const PORT = process.env.PORT || 5000



app.use(cors({
    
    origin:"http://localhost:5173",
    withCredentials:true

}))

app.use(express.json())
app.use(cookieParser())

// health 
app.get('/',async(req, res)=>{
    res.status(200).json({
        message:"The server is running"
    })
})

app.use('/api/auth',authRouter)



app.listen(PORT,()=>{
    connectDb()
    console.log(`Server started at ${PORT}`)
})

