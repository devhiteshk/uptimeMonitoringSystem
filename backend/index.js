import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/config.js";
import { loggService } from "./loggService/loggService.js";
import cron from "node-cron";

dotenv.config();

const db = process.env.MongoDBURL;

mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}🔥`)
);

loggService();

cron.schedule("*/10 * * * *", loggService);
