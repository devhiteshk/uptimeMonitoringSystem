import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imgUrl: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  projects: [
    {
      name: String,
      service: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Service" }],
    },
  ],
});

export default mongoose.model("User", User);
