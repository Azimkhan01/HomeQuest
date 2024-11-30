const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trime: true,
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
    image: {
      type: String,
      trim: true,
      required: false,
    },
    totalListing: {
      type: Number,
      required: false,
    },
    listing: {
      type: Array,
      required: false,
    },
    viewed: {
      type: Array,
    },
    like:{
      type:Array
    },
    role: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    strict: false, // Set strict mode to false
  }
);

const ListingSchema = new mongoose.Schema(
  // Database Schema (in your schema file)
  {
    owner: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
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
      default: false,
    },
    thumbnail: {
      type: String,

      required: false,
    },
    thumbnailStatus: {
      type: Boolean,
    },
    AllImages: {
      type: [String], // Array of strings to hold file paths for multiple images

      required: false,
    },
    video: {
      type: String,

      required: false,
    },
    propertyType: {
      type: String,
      trim: true,
      required: false,
    },
    listingType: {
      type: String,
      trim: true,
      required: false,
    },
    state: {
      type: String,
      trim: true,
    },
    buyingStatus: {
      type: Boolean,
      trim: true,
    },
    comment:{
      type:[],
      required:false
    },
    view:{
      type:Number
    },
    like:{
      type:Number
    }
  },
  {
    timestamps: true,
    strict: false, // Set strict mode to false
  }
);

const AgentSchema = new mongoose.Schema(
  {
    bio: {
      required: true,
      trim: true,
      type: String,
    },
    adhaarcard: {
      type: String,
      required: false,
      trim: true,
    },
    license: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trime: true,
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
    },frame:{
      type:String,
      trim:true
    },
    image: {
      type: String,
      trim: true,
      required: false,
    },
    totalListing: {
      type: Number,
      trim: true,
      required: false,
    },
    listing: {
      type: Array,
      trim: true,
      required: false,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    appointment:{
      type:[String],
      required:false
    },accept:{
      type:[String],
      required:false
    },reject:{
      type:[String],
      required:false
    }
  },
  {
    timestamps: true,
    strict: false, // Set strict mode to false
  }
);
const linkSchema = new mongoose.Schema({
  timestamp: { 
    type: Date,
    required: true,
  },
  time: { 
    type: String,
    required: true,
    match: [/^\d{6}$/, 'Time must be in hhmmss format'],
  },
});




module.exports = { userSchema, ListingSchema, AgentSchema , linkSchema };
