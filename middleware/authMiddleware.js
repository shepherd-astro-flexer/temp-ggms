import { BadRequestError, ForbiddenError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies;

    if (!token) throw new UnauthorizedError("authentication invalid")
    // verify token
    
    try {
        // if there is a problem when verifying the token, then we go to the catch block
        const {userId, role} = verifyJWT(token);

        const isTestUser = userId === "654fc7c716101ce1b45138b8";
        // * when we create a new prop and value on the req object and then invoke the next function, the prop will be accesible to the next controller
        // yung kasunod na controller, may access na dito sa user prop na ginawa natin
        req.user = {userId, role, isTestUser};
        next();
    } catch (error) {
        throw new UnauthorizedError("invalid token")
    }
}

export const checkTestUser = (req, res, next) => {
    if (req.user.isTestUser) {
        throw new BadRequestError("Demo User. Read Only")
    }

    next()
}

export const authorizePermissions = (...roles) => {
    // const {role} = req.user;
    return (req, res, next) => {
        console.log(roles.includes(req.user.role));
        // ! is it true na HINDI true ang value ng expression neto
        if (!roles.includes(req.user.role)) throw new ForbiddenError("not authorized");

        next();
    }
}