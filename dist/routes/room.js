"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Room_1 = __importDefault(require("../models/Room"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const room = await Room_1.default.create(req.body);
    res.json(room);
});
router.get("/", async (_req, res) => {
    const rooms = await Room_1.default.find();
    res.json(rooms);
});
router.get("/:id", async (req, res) => {
    const room = await Room_1.default.findById(req.params.id);
    res.json(room);
});
router.put("/:id", async (req, res) => {
    const room = await Room_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.json(room);
});
router.delete("/:id", async (req, res) => {
    await Room_1.default.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});
exports.default = router;
