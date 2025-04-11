import mongoose from "mongoose";

const userBookingSchema = mongoose.Schema({
    userBooking : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    packageBooking : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Package",
        required : true
    },

    doorstepPickup : {
        type : Boolean,
        default : false,
        required : true
    },

    pickupLocation : {
        type : String,
        required : function (){
            return this.doorstepPickup === true;
        }
    },

    emergencyContactAddress: { 
        type: String 
    },

    emergencyContactPhone: { 
        type: String 
    },

    totalAmount:{
        type:Number,
        required : true,
        min : 0
    },

    stripeSessionId:{
        type:String,
        unique:true
    }

},{timestamps : true})

const Booking = mongoose.model("Booking",userBookingSchema)

export default Booking