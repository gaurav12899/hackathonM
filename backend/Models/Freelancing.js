const mongoose = require("mongoose");
const FreelancingSchema = new mongoose.Schema({
  skill: {type: Array, required: true},
  email: {type: String, required: true},
  alternativeContact: {type: String, required: false},
  workExperience: {type: Number, required: true},
  hourlyRate: {type: Number, required: true},
  uid: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model("Freelancing", FreelancingSchema);
