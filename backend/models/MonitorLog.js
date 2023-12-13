import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MonitorLog = new Schema({
  hitTime: { type: Date },
  responseTime: { type: String },
  status: { type:String }
});

export default mongoose.model("MonitorLog", MonitorLog);
