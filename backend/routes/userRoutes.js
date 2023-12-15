import express from "express";
import {
  deleteAccount,
  updateUser,
  getUser,
} from "../controllers/userController.js";
const router = express.Router();

// ! not required
// router.delete("/deleteAccount", deleteAccount);
router.patch("/updateUser", updateUser);
router.get("/getUser", getUser);

export default router;
