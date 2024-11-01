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
    },
    totalListing:{
        type:Number,
        trim:true,
        required:false
    },
    listing:{
        type:Array,
        trim:true,
        required:false
    },
    longitude:{
        type:Number,
        trim:true
    },
    latitude:{
            type:Number,
            trim:true
        }
    
}, {
    timestamps: true,
    strict: false // Set strict mode to false
});

const ListingSchema = new mongoose.Schema({
    owner:{
      type:String,
      trim:true  
    },
    title:{
        type:String,
        required:false,
        trim:true,
    },
    price:{
        type:Number,
        required:false,
        trime:true
    },
    location: {
        type: String,
        required: false,
        trim: true,
    },
    area: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        default: false, // Set the default value of image to false
    },
    thumbnail:{
        type:String,
        trim: true,
        required:false
    },
    AllImages:{
        type:Number,
        trim:true,
        required:false
    },
    video:{
        type:String,
        trim:true,
        required:false
    },
    propertyType:{
        type:String,
        trim:true,
        required:false
    },
    listingType:{
        type:String,
        trim:true,
        required:false
    },
    state:{
        type:String,
        trim:true
    }
}, {
    timestamps: true,
    strict: false // Set strict mode to false
});



module.exports = { userSchema, ListingSchema };
