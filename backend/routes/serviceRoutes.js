import express from "express";
import {
  createProject,
  createService,
  getAllProjects,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/getAllProjects", getAllProjects);
router.post("/createProject", createProject);
router.post("/createService", createService);

export default router;
