import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE, MEMBER_TYPE } from "../utils/constants.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors/customErrors.js";
// import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { SEX } from "../utils/constants.js";
import Client from "../models/ClientModel.js";
import Attendance from "../models/AttendanceModel.js";

const validateJob = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = errors.array().map((err) => err.msg);

      if (errorMessage.length > 1) {
        throw new BadRequestError(`${errorMessage.length} errors occured`)
      }
      
      if (errorMessage[0]?.startsWith("job with")) {
        throw new NotFoundError(errorMessage)
      }

      if (errorMessage[0]?.startsWith("not authorize")) {
        throw new ForbiddenError(errorMessage)
      }

      if (!errors.isEmpty()) throw new BadRequestError(errorMessage);

      next();
    }
  ];
};

export const validationInput = validateJob([
  body("company")
    .notEmpty()
    .withMessage("company is required")
    .isLength({ min: 5, max: 30 })
    .withMessage("length must be betweem 5 to 30 characters long")
    .trim(),
  body("position")
    .notEmpty()
    .withMessage("position is required")
    .isLength({ min: 5, max: 30 })
    .withMessage("length must be betweem 5 to 30 characters long")
    .trim(),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
  body("jobLocation")
    .notEmpty()
    .withMessage("location is required")
    .trim()
]); 

export const validateParam = validateJob([
  param("id")
  .custom(async (id, {req}) => {
  
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new BadRequestError("invalid MongoDB ID");

      const client = await Client.findById(id);

      if (!client) throw new NotFoundError(`client with an ID of ${id} doesn't exist.`);
      // ! let's check if we will be needing this
      // const isAdmin = req.user.role === "admin";
      // if (!isAdmin && !isOwner) throw new ForbiddenError("not authorized to access this route")
  })
])
// * Validate User
export const validateRegister = validateJob([
    body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({min: 3, max: 30})
    .withMessage("username should be between 3 to 30 characters long.")
    .trim(),
    body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("should be a valid email")
    .custom(async (email) => {
        const user = await User.findOne({email})

        if (user) throw new Error("email already exist")
    })
    .trim(),
    body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({min: 5})
    .withMessage("password should be at least 5 characters long")
    .trim()
])

export const validateLogin = validateJob([
    body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("should be a valid email")
    .trim(),
    body("password")
    .notEmpty()
    .withMessage("password is required")
    .trim()
])

export const validateUpdateUserInput = validateJob([
  body("username")
  .notEmpty()
  .withMessage("username is required")
  .isLength({min: 3, max: 30})
  .withMessage("username should be between 3 to 30 characters long.")
  .trim(),
  body("email")
  .notEmpty()
  .withMessage("email is required")
  .isEmail()
  .withMessage("should be a valid email")
  .custom(async (email, {req}) => {
      // get back users that don't have the provided id(authenticated user id, so basically we want a list of the users wherin there id is not equal to the autenticated user id)
      // * REMEMBER: this returns an array
      const users = await User.find({_id: {$ne: req.user.userId}})
      // then using the array find method, find if there is an existing email on that array of users
      const user = users.find(user => user.email === email)
      // now if there is a user that exist with that email, then throw an error
      if (user) throw new Error("email already exist")
  })
  .trim()
])

export const validateClientInput = validateJob([
  body("name")
  .notEmpty()
  .withMessage("name is required")
  .isLength({min: 3, max: 30})
  .withMessage("name should be between 3 to 30 characters long"),
  body("lastName")
  .notEmpty()
  .withMessage("last name is required")
  .isLength({min: 3, max: 30})
  .withMessage("last name should be between 3 to 30 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("should be a valid email")
    .trim(),
  body("sex")
  .notEmpty()
  .isIn(Object.values(SEX))
  .withMessage("invalid sex value"),
  body("type")
  .notEmpty()
  .isIn(Object.values(MEMBER_TYPE))
  .withMessage("invalid member type value")
]) 

// ! attendance middleware
export const validateAttendance = validateJob([
  body("clientId")
  .custom(async (clientId, {req}) => {
    const isValid = mongoose.Types.ObjectId.isValid(clientId);
    if (!isValid) throw new BadRequestError("invalid MongoDB ID");

    const attendee = await Attendance.findOne({clientId, createdDate: req.body.createdDate});
    if (attendee) throw new BadRequestError(`Client already exist in the list.`);
})
])

export const validateQuery = validateJob([
  // ! validate query param
])