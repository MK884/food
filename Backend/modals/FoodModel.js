// const mongoose = require("mongoose")
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    photos:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

const FoodModel = new mongoose.model("Food",foodSchema)
// module.exports = FoodModel
export default FoodModel;