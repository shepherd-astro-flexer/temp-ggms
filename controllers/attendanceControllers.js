import Attendance from "../models/AttendanceModel.js";

export const addAttendee = async (req, res) => {
    // const {createdDate, name, lastName, clientId} = req.body;
    const attendee = await Attendance.create(req.body);
    console.log(attendee);
    res.status(201).json(attendee);
}

export const deleteAttendee = async (req, res) => {
    console.log(req.params.id);
    await Attendance.deleteOne({_id: req.params.id})
    res.status(200).json({msg: "successfully deleted attendee"})
}

export const editAttendee = async (req, res) => {
    await Attendance.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).json({msg: "successfully edited attendee"})
}