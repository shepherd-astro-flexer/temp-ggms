import express from "express";

// local imports
import { addAttendee, deleteAttendee } from "../controllers/attendanceControllers.js";
import { validateAttendance } from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.json(req.body);
})
.post(checkTestUser ,validateAttendance, addAttendee)

router.delete("/:id", checkTestUser, deleteAttendee)

export default router;