import express from "express";
import { createAdmin, loginAdmin, getProfile } from "../controller/admin.js";
import { checkToken } from "../middleware/authToken.js";

const router = express.Router();

router.post("/admin/signup", createAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile",checkToken, getProfile);

export default router;
