const express = require("express");
const mongoose = require("mongoose");
const postCommentModal = require("../Models/postComment");

const router = express.Router();

router.post("/", async (req, res) => {
  let { userId, postId, comment } = req.body;
  // debugger
  try {
    
    let model = new postCommentModal({
      postId, user: userId, comment
    })

    model.save().then((doc) => {
      res.status(201).send(doc)
    }).catch((err) => {
      res.status(400).send({ message: err.message })
    })

  } catch (err) {
    res.status(500).send({
      message: "Error while adding like",
    });
  }
});

module.exports = router;