const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostComment",
    required: true
  },
  likes: {
    type: Array,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("PostCommentLike", LikeSchema);
