import express from "express";
import {
  createProject,
  getAllProjects,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/getAllProjects", getAllProjects);
router.post("/createProject", createProject);

export default router;
