import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { jwtAuthGuard } from "./middlewares/jwtAuthGuard.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS POLICY
// app.use(
//     cors({
//       credentials: true,
//       origin: [
//         "https://country-state-city-api-v1.vercel.app",
//         "http://localhost:5173",
//       ],
//     })
//   );

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", jwtAuthGuard, userRoutes);
// app.use("/api/v1/service", jwtAuthGuard, seviceRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is Running",
  });
});

export default app;
