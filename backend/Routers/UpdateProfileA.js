
const express = require("express");
const router = express.Router();
const profileADB = require("../models/UpdateProfileA");

router.post("/", async (req, res) => {
  const updateProfileAData = new profileADB({
    firstName: req.body.firstName,
  lastName:req.body.lastName,
  dob:req.body.dob,
  mobileNo:req.body.mobileNo,
  alternateEmail:req.body.alternateEmail,
  gender:req.body.gender,
    user: req.body.user,
  });

  await updateProfileAData
    .save()
    .then((doc) => {
        console.log("Reached to router")
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Profile Not Updated Successfully",
      });
    });
});

module.exports = router;
