import { Router, Request, Response } from "express"
 
const router = Router()

router.post("/", async (req: Request, res: Response) => {
  const interaction = await userInteractionSchema.create({
    user: req.body.userId,
    room: req.body.roomId
  })
  res.json(interaction)
})

router.get("/", async (_req: Request, res: Response) => {
  const interactions = await userInteractionSchema.find()
    .populate("user")
    .populate("room")

  res.json(interactions)
})

router.get("/room/:roomId", async (req: Request, res: Response) => {
  const interactions = await userInteractionSchema.find({
    room: req.params.roomId
  }).populate("user")

  res.json(interactions)
})

router.delete("/:id", async (req: Request, res: Response) => {
  await userInteractionSchema.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router