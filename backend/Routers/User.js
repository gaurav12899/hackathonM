const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const UserModal = require("../models/User");

router.post("/", async (req, res) => {
  const userData = new UserModal(req.body);
  await userData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
        console.log('err', err);
      res.status(400).send({
        message: "User insert failed",
      });
    });
});

router.get("/", async (req, res) => {
     UserModal
      .find({})
      .then((doc) => {
        res.status(201).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          message: "bad request",
        });
      });
  });

  router.get("/:id", async (req, res) => {
      const userId = req.params.id;
      console.log(userId);
      UserModal
      .findOne({ _id: mongoose.Types.ObjectId(userId)})
      .then((doc) => {
          console.log(doc);
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          message: "bad request",
        });
      });
  });

  router.get("/getUserWithUid/:uid", async (req, res) => {
    const uid = req.params.uid;
    UserModal
    .findOne({ uid })
    .then((doc) => {
        console.log(doc);
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "bad request",
      });
    });
});

  router.put("/:id", async (req, res) => {
    debugger
    const userId = req.params.id;
    // const userData = new UserModal({
    //     uid: req.body.uid,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     dob: new Date(req.body.dob),
    //     mobileNumber: req.body.mobileNumber,
    //     email: req.body.email,
    //     gender: req.body.gender,
    //     community: req.body.community,
    //     interests: req.body.interests,
    //     company: req.body.company,
    //     workExperience: req.body.workExperience
    //   });
  await UserModal
    .findOneAndUpdate({ uid: userId.toString() }, req.body)
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "User update failed " + err.message,
      });
    });
});

module.exports = router;
