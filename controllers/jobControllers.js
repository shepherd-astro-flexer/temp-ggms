import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({ data: jobs})
}

export const createJob = async (req, res) => {
    // attach natin yung bagong property 
    req.body.createdBy = req.user.userId;
    // we can just pass in the whole req.body. If there is property that doesn't exist on the schemam, mongodb will just ignore it.
    // then we just pass in the whole req.body object
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

export const deleteManyJob = async (req, res) => {
    const {deletedCount} = await Job.deleteMany({company: "gluegel"})

    res.status(StatusCodes.CREATED).json({msg: `deleted ${deletedCount} item${deletedCount > 1 ? "'s" : ""}`})
}

export const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id)
    res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
    const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(StatusCodes.OK).json({data: updateJob, msg: "successfully updated item." })
}

export const deleteJob = async (req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id)

    res.status(StatusCodes.CREATED).json({data: job, msg: "item deleted sucessfully"})
}
