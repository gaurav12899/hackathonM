const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    community: {
        type: String,
        required: false
    },
    interests: {
        type: [String],
        required: false
    },
    company: {
        type: String,
        required: false
    },
    workExperience: {
        type: String,
        required: false
    },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
