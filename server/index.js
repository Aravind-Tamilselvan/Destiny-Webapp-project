import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDB from "./lib/connectDB.js"
import authRoutes from "./routes/auth.route.js"
import packageRoutes from "./routes/package.route.js"
import paymentRoutes from "./routes/booking.route.js"

import path from "path"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5500
const __dirname = path.resolve()

app.use(express.json({
    limit: "500mb",
    extended:true
}))
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes)
app.use("/api/package",packageRoutes)
app.use("/api/payments",paymentRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/client/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
    })
}


connectDB() //connects to mongo db
app.listen(PORT,()=>{
    console.log(`💻 Server is running on http://localhost:${PORT}/`)
})