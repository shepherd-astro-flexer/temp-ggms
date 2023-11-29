import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role: {
        type:String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: String,
    avatarPublicId: String
})

// remove password
UserSchema.methods.removePassword = function() {
    const object = this.toObject()
    delete object.password
    return object
}

export default mongoose.model("User", UserSchema)