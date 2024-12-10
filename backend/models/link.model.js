import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {timestamps: true})

const linkModel = mongoose.model("Link", linkSchema)

export default linkModel