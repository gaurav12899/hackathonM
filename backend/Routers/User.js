const express = require("express");
const router = express.Router();
const UserModal = require("../models/User");

router.post("/", async (req, res) => {
  const userData = new UserModal({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: new Date(req.body.dob),
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    gender: req.body.gender,
    community: req.body.community,
    interests: req.body.interests,
    company: req.body.company,
    workExperience: req.body.workExperience
  });

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
    await UserModal
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
      const { userId } = req.params.id;
    await UserModal
      .findOne({ _id: id })
      .then((doc) => {
        res.status(201).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          message: "bad request",
        });
      });
  });

  router.put("/:id", async (req, res) => {
    const { userId } = req.params.id;
    const userData = new UserModal({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: new Date(req.body.dob),
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        gender: req.body.gender,
        community: req.body.community,
        interests: req.body.interests,
        company: req.body.company,
        workExperience: req.body.workExperience
      });
  await UserModal
    .findOneAndUpdate({ _id: id }, userData)
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "User update failed",
      });
    });
});

module.exports = router;
