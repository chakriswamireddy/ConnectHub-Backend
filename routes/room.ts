import { Request, Response, Router } from "express"
import Room from "../models/Room"

 

const router = Router()

router.post("/", async (req: Request, res: Response) => {
  const room = await Room.create(req.body)
  res.json(room)
})

router.get("/", async (_req: Request, res: Response) => {
  const rooms = await Room.find()
  res.json(rooms)
})

router.get("/:id", async (req: Request, res: Response) => {
  const room = await Room.findById(req.params.id)
  res.json(room)
})

router.put("/:id", async (req: Request, res: Response) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.json(room)
})

router.delete("/:id", async (req: Request, res: Response) => {
  await Room.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router