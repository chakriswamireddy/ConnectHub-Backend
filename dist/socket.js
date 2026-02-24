"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
const socket_io_1 = require("socket.io");
const rooms = {};
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket", "polling"],
    });
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        socket.on("join-room", (roomId, peerId) => {
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
        socket.on("user-toggle-audio", (peerId, roomId) => {
            socket.to(roomId).emit("user-toggle-audio", peerId);
        });
        socket.on("user-toggle-video", (peerId, roomId) => {
            socket.to(roomId).emit("user-toggle-video", peerId);
        });
        socket.on("user-leave", (peerId, roomId) => {
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
