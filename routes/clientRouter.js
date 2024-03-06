// ! fixed client router 
import express from "express";
// local imports
// ! import controllers
import { createClient, deleteClient, editClient, getClient, searchClient, showSingleStats } from "../controllers/clientController.js"; 
import {validateClientInput, validateParam } from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

export const router = express.Router();

router.route("/add-client")
.post(validateClientInput, checkTestUser, createClient)

router.route("/search-clients")
.get(searchClient)

router.route("/:id")
.get(validateParam, getClient)
.patch(checkTestUser, validateParam, validateClientInput, editClient)
.delete(checkTestUser, validateParam, deleteClient)

router.route("/single-stats/:id")
.get(showSingleStats)