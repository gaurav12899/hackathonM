const mongoose = require("mongoose");
const User = require("./User");
const Schema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("PostComment", Schema);
