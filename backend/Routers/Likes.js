const express = require("express");
const mongoose = require("mongoose");
const likeDB = require("../models/Likes");

const router = express.Router();

router.post("/", async (req, res) => {
    debugger
  try {
    const alreadyAddLike = await likeDB.findOne({
      post: mongoose.Types.ObjectId(req.body.postId),
    });
    if (alreadyAddLike) {
      const payload = {};
      if (req.body.like) {
        payload.likes = alreadyAddLike.likes + 1;
      } else {
        payload.likes = alreadyAddLike.likes - 1;
      }
      const response = await likeDB.findByIdAndUpdate(
        { post: mongoose.Types.ObjectId(req.body.postId) },
        payload,
        { new: true }
      );
      res.send(201).send({ response, message: "Your like added successfully" });
    } else {
      await likeDB
        .create({
          post: req.body.postId,
          like: 1
        })
        .then((doc) => {
          res.status(201).send({
            response: doc,
            message: "Your like added successfully",
          });
        })
        .catch((err) => {
          res.status(400).send({
            error: err,
            message: "Bad format",
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error while adding like",
    });
  }
});
