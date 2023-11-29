import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema({
    company:String,
    position:String,
    jobStatus: {
        type:String,
        enum: Object.values(JOB_STATUS),
        // * how default works is that if there is no value specified, it will be the value
        default: JOB_STATUS.PENDING
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME
    },
    jobLocation: {
        type: String,
        default: "my city"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})
// what timestamps does is it adds a createdAt and updatedAt property (and also, mongoose automatically adds an ID)
export default mongoose.model("Job", JobSchema)
// * First param is the NAME of the collection (what collection means is the TABLE)
// * the name gets lowercased and pluralized
// * Second param is the SCHEMA, so we just pass in the job schema that we just created
