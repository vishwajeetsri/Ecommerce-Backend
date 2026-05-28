import express from "express"
import cors from "cors"
import "dotenv/config"
import dbConnect from "./config/mongodb.js";
import connectCloudnary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// App config(Instance)

const app = express();
const port = process.env.PORT || 4000
dbConnect()
connectCloudnary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints

app.use("/api/user", userRouter)

app.get("/",(req,res) => {
     res.send("Api is working")
})

app.listen(port,() =>{
    console.log("Server started on PORT: " + port)
})


