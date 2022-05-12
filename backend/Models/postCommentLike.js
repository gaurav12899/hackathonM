const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: {
    type: Array
  }
}, {timestamps: true});

module.exports = mongoose.model("PostCommentLike", LikeSchema);
