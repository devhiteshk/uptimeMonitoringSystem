import express from "express";
import {
  createProject,
  createService,
  deleteProject,
  deleteService,
  getAllProjects,
  getAllServices,
  getServiceById,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/getAllProjects", getAllProjects);
router.post("/createProject", createProject);
router.post("/createService", createService);
router.post("/getAllServices", getAllServices);
router.get("/getService/:id", getServiceById);
router.delete("/deleteService/:serviceId/:projectId", deleteService);
router.delete("/deleteProject/:projectId", deleteProject);

export default router;
