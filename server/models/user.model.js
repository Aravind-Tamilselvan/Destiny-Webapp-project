import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    img:{
        type : String,
        default:""
    },

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : [true,"Email is required for aunthetication"],
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    phoneNo : {
        type : String,
        required : [true,"phone number is required for aunthetication"]
    },

    address : {
        type : String,
        required : true
    },
},{timestamps : true})

const User = mongoose.model("User",userSchema)

export default User