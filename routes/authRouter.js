import express from "express";
// local imports
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
// validation
import { validateRegister, validateLogin } from "../middleware/validationMiddleware.js";

export const router = express.Router();

router.route("/login")
.post(validateLogin, loginUser)

router.route("/register")
.post(validateRegister, registerUser)

router.route("/logout")
.get(logoutUser)