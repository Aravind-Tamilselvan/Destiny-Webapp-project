import mongoose from "mongoose";

const packageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: [String],
        required: [true, "Image is required"]
    },

    packageDetails: {
        totalDays: {
            type: Number,
            required: [true, "Total days are required"]
        },
        totalCost: {
            type: Number,
            required: [true, "Total cost is required"]
        },
        tripPlan: [{
            key:{
                type : String,
                required:true
            },
            day:{
                type : String,
                required:true
            },
            activities:{
                type : String,
                required:true
            }
        }]
    },


    packageType: {
        type : String,
        enum: ["adventure", "family", "luxury", "solo"],
        required: [true, "Package type is required"]
    },

    availability: {
        totalSlots: {
            type: Number,
            required: [true, "Total slots are required"]
        },
        bookedSlots: {
            type: Number,
            default : 0
        }
    },

    language : {
        type : String,
        required : true
    },

    location : {
        type : String,
        required : true
    },

    customizablePackage:{
        type:Boolean,
        default : false
    },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],

}, { timestamps: true })

const Package = mongoose.model("Package", packageSchema)

export default Package