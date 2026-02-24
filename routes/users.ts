import { Request, Response } from "express"

const express = require("express")
const User = require("../models/User")

const router = express.Router()

router.post("/", async (req: Request, res:Response) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get("/", async (req: Request, res:Response) => {
  const users = await User.find()
  res.json(users)
})

router.get("/:id", async (req: Request, res:Response) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

router.put("/:id", async (req: Request, res:Response)=> {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.json(user)
})

router.delete("/:id", async (req: Request, res:Response) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

module.exports = router