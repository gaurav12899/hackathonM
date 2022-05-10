const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
  title: {type: Array, required: true},
  body: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Article", ArticleSchema);
