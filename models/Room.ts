import { Schema, model, Document } from "mongoose"

export interface IRoom extends Document {
  title: string
}

const roomSchema = new Schema<IRoom>(
  {
    title: { type: String, required: true }
  },
  { timestamps: true }
)

const Room = model<IRoom>("Room", roomSchema)

export default Room