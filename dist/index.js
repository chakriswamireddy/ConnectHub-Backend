"use strict";
// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"
// import dotenv from "dotenv"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// mongoose.connect(process.env.MONGO_URI as string)
app.get("/health", (req, res) => {
    return res.status(200).json({ message: "OK" });
});
const server = http_1.default.createServer(app);
(0, socket_1.initSocket)(server);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log("Server running on", PORT);
});
