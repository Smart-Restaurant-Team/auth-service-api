import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    name: {string: true, required: true},
    description: String,
    logo: String,
    address: String,
    tel: String,
    email: String,
    website: String,
    isPublic : {type: Boolean, default: false},
},{timestamps:true})