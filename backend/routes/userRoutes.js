import express from "express";
import { deleteAccount, updateUser } from "../controllers/userController.js";
const router = express.Router();

router.delete("/deleteAccount", deleteAccount);
router.patch("/updateUser", updateUser);

export default router;
