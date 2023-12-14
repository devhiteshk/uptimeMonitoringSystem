import express from "express";
import {
  createProject,
  createService,
  deleteProject,
  deleteService,
  getAllProjects,
  getAllServices,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/getAllProjects", getAllProjects);
router.post("/createProject", createProject);
router.post("/createService", createService);
router.post("/getAllServices", getAllServices);
router.delete("/deleteService", deleteService);
router.delete("/deleteProject", deleteProject);

export default router;
