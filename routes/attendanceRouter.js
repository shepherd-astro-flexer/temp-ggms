import express from "express";

// local imports
import Attendance from "../models/AttendanceModel.js";
import { BadRequestError } from "../errors/customErrors.js";
import { validateAttendance } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.json(req.body);
})
.post(validateAttendance, async (req, res) => {
    // const {createdDate, name, lastName, clientId} = req.body;

    try {
        const attendee = await Attendance.create(req.body);
        console.log(attendee);
        res.status(201).json(attendee);
    } catch (error) {
        console.log(error);
    }
})

router.route("/:id")
.delete(async (req, res) => {
    console.log(req.params.id);
    await Attendance.deleteOne({_id: req.params.id})
    res.status(200).json({msg: "successfully deleted attendee"})
})

export default router;