import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Project = new Schema({
  name: { type: String },
  services: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Service" }],
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

export default mongoose.model("Project", Project);
