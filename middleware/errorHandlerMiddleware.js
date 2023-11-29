import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = error.message || "something went wrong, please try again later"
    res.status(statusCode).json({ msg });
}