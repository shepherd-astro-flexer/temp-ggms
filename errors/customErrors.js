import { StatusCodes } from "http-status-codes"

export class NotFoundError extends Error {
    constructor(message) {
        console.log(message);
        super(message);
        this.name = "NotFoundError";
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = StatusCodes.FORBIDDEN
    }
}
