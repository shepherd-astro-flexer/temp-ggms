import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword
}

export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)

    return isMatch;
}