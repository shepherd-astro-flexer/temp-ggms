import { StatusCodes } from "http-status-codes"
import cloudinary from "cloudinary";
// * local imports
import User from "../models/UserModel.js"
import Client from "../models/ClientModel.js"
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async(req, res) => {
    const user = await User.findOne({_id: req.user.userId})
    const userWithoutPassword = user.removePassword()
    // console.log(userWithoutPassword);
    res.status(StatusCodes.OK).json(userWithoutPassword)
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const clients = await Client.countDocuments();

    res.status(StatusCodes.OK).json({users, clients})
}

export const updateUser = async (req, res) => {
    // * we will have access to the req.file object because of the multer package
    // * we will need some of its values, BUT we don't necessarily need to add it on the req object
    const obj = {...req.body}
    
    delete obj.password;
    if (req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        // so once mailagay na natin yung file sa public/upload
        // this is the url directed to the image that is uploaded
        obj.avatar = response.secure_url;
        // we are going to use this avatarPublicId to perform CRUD operations on the cloudinary
        obj.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    // console.log(userWithoutPassword);
    res.status(StatusCodes.OK).json({msg: "updated user"})
}