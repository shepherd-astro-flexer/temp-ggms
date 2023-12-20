import express from "express";

// local imports
import { addAttendee, deleteAttendee, editAttendee } from "../controllers/attendanceControllers.js";
import { validateAttendance } from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.json(req.body);
})
.post(checkTestUser ,validateAttendance, addAttendee)

router.route("/:id")
.delete(checkTestUser, deleteAttendee)
.patch(checkTestUser, editAttendee)



export default router;