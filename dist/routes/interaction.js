"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const interaction = await userInteractionSchema.create({
        user: req.body.userId,
        room: req.body.roomId
    });
    res.json(interaction);
});
router.get("/", async (_req, res) => {
    const interactions = await userInteractionSchema.find()
        .populate("user")
        .populate("room");
    res.json(interactions);
});
router.get("/room/:roomId", async (req, res) => {
    const interactions = await userInteractionSchema.find({
        room: req.params.roomId
    }).populate("user");
    res.json(interactions);
});
router.delete("/:id", async (req, res) => {
    await userInteractionSchema.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});
exports.default = router;
