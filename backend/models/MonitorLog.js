import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MonitorLog = new Schema({
  hitTime: { type: Date },
  responseTime: { type: String },
  downTime: { type: Date },
  downReason: { type: String },
});

export default mongoose.Model("MonitorLog", MonitorLog);
