import express from "express";
import rateLimiter from "express-rate-limit"
// local imports
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
// validation
import { validateRegister, validateLogin } from "../middleware/validationMiddleware.js";

export const router = express.Router();

const apiLimiter = rateLimiter({
    windowMs: 1000 * 60 * 10,
    max: 30,
    message: {
        msg: "IP rate limit exceeded, retry in 10 minutes"
    }
})

router.route("/login")
.post(apiLimiter, validateLogin, loginUser)

router.route("/register")
.post(apiLimiter, validateRegister, registerUser)

router.route("/logout")
.get(logoutUser)