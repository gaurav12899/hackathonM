const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    skill: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    profileUrl: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
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

});

module.exports = mongoose.model("User", userSchema);
