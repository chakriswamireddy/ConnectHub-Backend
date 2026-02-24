import mongoose from "mongoose"

 
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Connect-User", userSchema)