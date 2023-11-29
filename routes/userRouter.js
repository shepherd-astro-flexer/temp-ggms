import express from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userControllers.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkTestUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.route("/current-user")
.get(getCurrentUser)

router.route("/admin/app-stats")
.get(authorizePermissions("admin") ,getApplicationStats)

router.route("/update-user")
.patch(checkTestUser, upload.single("avatar"), validateUpdateUserInput, updateUser)

export default router