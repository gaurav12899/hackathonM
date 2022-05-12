const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  likes: {
    type: Array
  },
  disLikes: {
    type: Array
  }
}, {timestamps: true});

module.exports = mongoose.model("QuestionLikes", Schema);