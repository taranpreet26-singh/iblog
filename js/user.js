import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
    fullname : String,
    image : String,
    uniqueId : String,
    emailId : String,
    password : String,
    about : String
})

export const User = mongoose.model('User',userSchema)