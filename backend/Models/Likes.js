const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

module.exports = mongoose.model("Like", LikeSchema);
