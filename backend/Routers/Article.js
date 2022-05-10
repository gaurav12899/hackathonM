const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const articleDB = require("../models/Article");

router.post("/add", async (req, res) => {
  try {
    await articleDB
      .create(req.body)
      .then((doc) => {
        res.status(200).send({
          response: doc,  
          message: "Record added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
        });
      });
  } catch (err) {
    res.status(500).send({
      message: "Error while adding data",
    });
  }
});

router.get("/getAllRecord", async (req, res) => {
    try {
      await articleDB.find({})
        .then((doc) => {
          res.status(200).send({
            response: doc,  
            message: "success",
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: "Bad format",
          });
        });
    } catch (err) {
      res.status(500).send({
        message: "Error",
      });
    }
});

router.get("/getRecord/:id", async (req, res) => {
    try {
      await articleDB.findOne({_id: mongoose.Types.ObjectId(req.params.id)})
        .then((doc) => {
          res.status(200).send({
            response: doc,  
            message: "success",
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: "Bad format",
          });
        });
    } catch (err) {
      res.status(500).send({
        message: "Error",
      });
    }
});

module.exports = router;
