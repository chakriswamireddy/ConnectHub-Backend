import { Server, Socket } from "socket.io"
import http from "http"

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    transports: ["websocket", "polling"],
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  })

  io.on("connection", (socket: Socket) => {
    console.log("Server is Connected", socket.id)

    socket.on("join-room", (roomId: string, userId: string) => {
      console.log(`${userId} a new user joined in room ${roomId}`)

      socket.join(roomId)


      socket.to(roomId).emit("user-connected", userId)
    })

    socket.on("user-toggle-audio", (userId: string, roomId: string) => {
      console.log(userId, "want to toggle audio", roomId)

      socket.to(roomId).emit("user-toggle-audio", userId)
    })

    socket.on("user-toggle-video", (userId: string, roomId: string) => {
      console.log(userId, "want to toggle video", roomId)

      socket.to(roomId).emit("user-toggle-video", userId)
    })

    socket.on("user-leave", (userId: string, roomId: string) => {
      console.log(userId, "want to leave this room", roomId)

      socket.to(roomId).emit("user-leave", userId)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id)
    })
  })
}