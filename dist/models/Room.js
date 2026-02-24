"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    title: { type: String, required: true }
}, { timestamps: true });
const Room = (0, mongoose_1.model)("Room", roomSchema);
exports.default = Room;
