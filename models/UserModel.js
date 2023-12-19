import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from "mongoose-findorcreate";

const UserSchema = new mongoose.Schema({
    googleId: String,
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

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate)

// remove password
UserSchema.methods.removePassword = function() {
    const object = this.toObject()
    delete object.password
    return object
}

export default mongoose.model("User", UserSchema)