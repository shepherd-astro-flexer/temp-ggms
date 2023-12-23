import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    sex: {
        type: String,
        enum: ["male", "female"],
    },
    type: {
        type: String,
        enum: ["regular", "student"]
    },
    email: String,
    // ! added birthdate
    birthdate: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Client", ClientSchema)