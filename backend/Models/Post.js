const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  user: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Post", Schema);
