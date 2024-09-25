const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
}, {
    timestamps: true, // This will add createdAt and updatedAt timestamps
});

const dataScehma = new mongoose.Schema({},{strict:false});


module.exports = {userSchema,dataScehma}