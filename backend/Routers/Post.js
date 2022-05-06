const express = require("express");
const router = express.Router();
const postModel = require("../models/Post");

router.post("/", async (req, res) => {
  const model = new postModel({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    user: req.body.user
  });

  model.save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Post not added successfully",
      });
    });
});

module.exports = router;
