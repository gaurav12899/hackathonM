const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const freelancingDB = require("../models/Freelancing");
const userModel = require("../models/User");

router.post("/add", async (req, res) => {
  try {
    await freelancingDB
      .create(req.body)
      .then((doc) => {
        res.status(200).send({
          response: doc,  
          message: "Record added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format" + err.message,
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
      freelancingDB.find({}).lean()
        .then(async (doc) => {

          for (let i = 0; i < doc.length; i++) {
            console.log('doc[i]', doc[i]);
            let data = await userModel.findOne({ uid: doc[i].uid }).lean();
            doc[i]['user'] = data;
          }

          res.status(200).send(doc);
        })
        .catch((err) => {
          res.status(400).send({
            message: "Bad format " + err.message,
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
      await freelancingDB.findOne({_id: mongoose.Types.ObjectId(req.params.id)}).lean()
        .then(async (doc) => {

          let data = await userModel.findOne({ uid: doc.uid }).lean();
          doc['user'] = data;

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
