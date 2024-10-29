const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false,
        trim:true,
    },
    phone:{
        type:String,
        required:false,
        trime:true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgStatus: {
        type: Boolean,
        default: false, // Set the default value of image to false
    },
    image:{
        type:String,
        trim: true,
        required:false
    }
}, {
    timestamps: true,
    strict: false // Set strict mode to false
});



module.exports = { userSchema };
