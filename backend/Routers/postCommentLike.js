const express = require("express");
const mongoose = require("mongoose");
const postCommentLikeModel = require("../models/postCommentLike");

const router = express.Router();

const arrayToggleId = (arr, id) => {
  let index = arr.indexOf(id);

  if (index == -1) {
    arr.push(id);
  } else {
    arr.splice(id, 1);
  }

  return arr;
};

router.post("/liketoggle", async (req, res) => {
  let { userId, commentId } = req.body;
  try {
    
    const postData = await postCommentLikeModel.findOne({
      commentId: mongoose.Types.ObjectId(req.body.commentId),
    }).lean();

    if (postData) {
      postData.likes = arrayToggleId(postData.likes, userId);
      const response = await postCommentLikeModel.findOneAndUpdate({ commentId: mongoose.Types.ObjectId(commentId) }, postData, { new: true });
      res.status(201).send({ response, message: "Your like added successfully" });
    } else {
      let model = new postCommentLikeModel({
        commentId,
        likes: [ userId ],
      });
        model.save().then((doc) => {
          res.status(201).send({
            response: doc,
            message: "Your like added successfully",
          });
        })
        .catch((err) => {
          res.status(400).send({
            error: err,
            message: "Bad Request",
          });
        });
  }
  } catch (err) {
    res.status(500).send({
      message: "Error while adding like",
    });
  }
});

module.exports = router;