import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import { jwtAuthGuard } from "./middlewares/jwtAuthGuard.js";
import cors from "cors";

const app = express();
// CORS POLICY
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", jwtAuthGuard, userRoutes);
app.use("/api/v1/service", jwtAuthGuard, serviceRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is Running",
  });
});

export default app;
