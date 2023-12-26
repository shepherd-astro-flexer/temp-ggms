import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    createdDate: String,
    name: String,
    lastName: String,
    note: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        ref: "Client"
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: "Client"
    } 
}, {timestamps: true})

export default mongoose.model("Attendance", AttendanceSchema)