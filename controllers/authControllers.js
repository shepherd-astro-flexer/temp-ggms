import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js"
import { comparePassword, hashPassword } from "../utils/hash.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { createToken } from "../utils/token.js";

export const loginUser = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
      // using the req object, find the email on the database
    const user = await User.findOne({email})
    // the validation is in the password so we just say password is incorrect instead of incorrect email
    if (!user) throw new UnauthorizedError("email doesn't exist")

    const passwordIsCorrect = await comparePassword(password, user.password)
    
    if (!passwordIsCorrect) throw new UnauthorizedError("password is incorrect")
    // if this generates the same result, then that means the password is correct
    const token = createToken({userId: user._id, role: user.role})
    
    const oneDay = 1000 * 60 * 60 * 24
    // key, value, options object
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    })
    // we are not going to send the token in the http only cookie approach
    res.status(StatusCodes.OK).json({msg: "logged in successfully" })
}

export const googleLogin = async (req, res) => {
    const {name, email} = req.body;

    let user = await User.findOne({email});

    if (!user) {
        user = await User.create({
            username: name,
            email
        })
    }
    
    const token = createToken({userId: user._id, role: user.role})
    
    const oneDay = 1000 * 60 * 60 * 24
    // key, value, options object
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    })

    res.status(StatusCodes.OK).json({msg: "logged in successfully" })
}

export const registerUser = async (req, res) => {
    // if userCount is equals to 0 that means we are creating the first user
    const userCount = await User.countDocuments() === 0;

    const hashedPassword = await hashPassword(req.body.password)
    // where mutating it before storing on the database
    req.body.role = userCount ? "admin" : "user";

    req.body.password = hashedPassword;
   
    const user = await User.create(req.body);

    res.status(StatusCodes.OK).json({user, msg: "account created successfully"})
}

export const logoutUser = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({msg: "user logged out successfully"})
}


