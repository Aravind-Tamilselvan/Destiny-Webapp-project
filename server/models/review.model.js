import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    packageReview : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Package",
        required : true
    },

    rating : {
        type : Number,
        required : [true,"Ratings are required"],
        min: 1,
        max: 5,
    },

    image : [{
        type : String,
    }],

    video : [{
        type : String,
    }],

    reviewDescription : {
        type : String,
        required : true
    },

    helpfulCount : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default:[]
    }],

},{timestamps : true})

const Review = mongoose.model("Review",reviewSchema)

export default Review