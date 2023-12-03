import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Service = new Schema({
  serviceName: { type: String, required: true },
  url: { type: String },
  upCount: { type: Number, default: 0 },
  downCount: { type: Number, default: 0 },
  currentStatus: { status: String, reason: String },
});

export default mongoose.model("Service", Service);