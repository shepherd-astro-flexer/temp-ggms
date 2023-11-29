import jwt from "jsonwebtoken"

export const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return token;
}

export const verifyJWT = (token) => {
    const decode = jwt.verify(token, process.env.JWT_KEY);

    return decode;
}