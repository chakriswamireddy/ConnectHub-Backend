// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"
// import dotenv from "dotenv"

// import userRoutes from "./routes/users"
// import roomRoutes from "./routes/rooms"
// import interactionRoutes from "./routes/interactions"

// dotenv.config()

// const app = express()

// app.use(cors())
// app.use(express.json())

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("MongoDB connected"))
//   .catch(console.error)

// app.use("/users", userRoutes)
// app.use("/rooms", roomRoutes)
// app.use("/interactions", interactionRoutes)

// const PORT = process.env.PORT || 4000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })


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



const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log("Server running on", PORT)
})