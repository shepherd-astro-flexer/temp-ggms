import express from "express";
// local imports
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  deleteManyJob
} from "../controllers/jobControllers.js";

import { validationInput, validateParam } from "../middleware/validationMiddleware.js";

export const router = express.Router();

router.route("/")
.get(getAllJobs)
.post(validationInput, createJob)
.delete(deleteManyJob);

router.route("/:id")
.get(validateParam, getJob)
.patch(validationInput, validateParam, updateJob)
.delete(validateParam, deleteJob);
