import { Server, Socket } from "socket.io";
import http from "http";

type PlayerMap = {
  [socketId: string]: {
    peerId: string;
  };
};

const rooms: Record<string, PlayerMap> = {};

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-room", (roomId: string, peerId: string) => {
      console.log(`${peerId} joined room ${roomId}`);

      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = {};
      }

      rooms[roomId][socket.id] = { peerId };

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
        peerId,
      });

      io.to(roomId).emit("players", rooms[roomId]);
    });

    socket.on("user-toggle-audio", (peerId: string, roomId: string) => {
      socket.to(roomId).emit("user-toggle-audio", peerId);
    });

    socket.on("user-toggle-video", (peerId: string, roomId: string) => {
      socket.to(roomId).emit("user-toggle-video", peerId);
    });

    socket.on("user-leave", (peerId: string, roomId: string) => {
      socket.to(roomId).emit("user-leave", peerId);
      socket.leave(roomId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      for (const roomId in rooms) {
        if (rooms[roomId][socket.id]) {
          delete rooms[roomId][socket.id];

          io.to(roomId).emit("players", rooms[roomId]);

          if (Object.keys(rooms[roomId]).length === 0) {
            delete rooms[roomId];
          }
        }
      }
    });
  });
}