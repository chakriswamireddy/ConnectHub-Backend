

import express, { Request, Response } from "express"
import http from "http"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { initSocket } from "./socket"
 

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// mongoose.connect(process.env.MONGO_URI as string)

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({ message: "OK" })
  })

const server = http.createServer(app)
initSocket(server)



const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log("Server running on", PORT)
})