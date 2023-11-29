// ! fixed client controller
import { StatusCodes } from "http-status-codes";
import Client from "../models/ClientModel.js";
import Attendance from "../models/AttendanceModel.js";

export const createClient = async (req, res) => {
    const {name, lastName} = req.body
    // attach natin yung bagong property 
    req.body.createdBy = req.user.userId;
    // ! check if the client name and last name exist
    console.log(name, lastName);
    // we can just pass in the whole req.body. If there is property that doesn't exist on the schema, mongodb will just ignore it.
    // then we just pass in the whole req.body object
    const job = await Client.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

export const searchClient = async (req, res) => {
    const {search, sort, createdDate} = req.query;
    
    const {isTestUser, userId} = req.user;
    // ? how do we sort the data?
    // ? checking for multiple filters?
    console.log(req.query);
    const attendees = await Attendance.find({createdDate});
    const filterObject = {
        createdBy: isTestUser ? userId : {$ne: "654fc7c716101ce1b45138b8"}
    }

    if (search) {
        filterObject.$or = [
            {name: {$regex: search, $options: "i"}},
            {lastName: {$regex: search, $options: "i"}}
        ]
    }
    // ! if we go with this condition wherein we just check if jobType is NOT equals to "all", when the value is undefined it will still use it
    // ! so a good thing to do here is to check if jobType exist, basically check if it is true, and if that is the case use it; If not, don't
    // if (jobType && jobType !== "all") {
    //     filterObject.jobType = jobType
    // }
    // ! we need to add filters depending on the query that we are getting from the frontend
    // if (createdDate) {
    //     filterObject.attendees = attendees;
    // }
    // {clients, attendees, query: req.query}
    // ! this works but there is a much better approach
    // const sortFormat = sort === "z-a" ? "-name" : sort === "a-z" ? "name" : sort === "newest" ? "-createdAt" : "createdAt";
    const sortObject = {
        newest: "-createdAt",
        oldest: "createdAt",
        "a-z": "name",
        "z-a": "-name"
    }

    const sortItems = sortObject[sort] || sortObject.oldest;

    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10
    // * so ang value netong skip will depend on how many items you want to skip
    const clients = await Client.find(filterObject).sort(sortItems).skip(skip).limit(10);
    // * asynchrounously returns the number of items on a specific model
    const totalJobs = await Client.countDocuments(filterObject);
    
    const numberOfPages = Math.ceil(totalJobs / 10); 

    res.status(StatusCodes.OK).json({currentPage: page, numberOfPages, totalJobs, clients, attendees, query: req.query});
}
// ! validate the id
export const getClient = async (req, res) => {
    const client = await Client.findById(req.params.id);
    console.log(client);
    res.status(StatusCodes.OK).json(client)
}

export const editClient = async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    console.log(client);
    res.status(StatusCodes.OK).json({msg: "client edited successfully"})
}

export const deleteClient = async (req, res) => {
    await Client.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({msg: "client deleted successfully"})
}
