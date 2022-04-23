const mongoose = require("mongoose");

const UpdateProfileA = new mongoose.Schema({
  firstName: String,
  lastName:String,
  updatedAt:{
    type: Date,
    default: Date.now(),
  },
  dob:String,
  mobileNo:String,
  alternateEmail:String,
  gender:String,
  user: Object
});

module.exports = mongoose.model("UpdateProfileA", UpdateProfileA);
