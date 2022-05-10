const express = require("express");
const router = express.Router();
const postModel = require("../models/Post");

const multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// var upload = multer({ storage: storage })

const imageUpload = multer({
  storage,
  // limits: {
  //    fileSize: 1000000 * 5, // 1000000 Bytes = 1 MB * 5
  // },
  fileFilter(req, file, cb) {
      if (!/^image\/(jpeg|png|gif)$/.test(file.mimetype)) {
          // upload only png and jpg format
          return cb(
              new Error(
                  'Please upload an Image with ".jpg", ".jpeg", ".png" or ".gif" formats.'
              )
          );
      }
      cb(undefined, true);
  },
});

router.post("/", imageUpload.single('image'), async (req, res) => {
  // debugger
  console.log("file_name", req.file);
  const model = new postModel({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    user: JSON.parse(req.body.user),
    image: `uploads/${req.file.originalname}`
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

router.get("/", async (req, res) => {
  // const model = new postModel({
  //   title: req.body.title,
  //   description: req.body.description,
  //   tags: req.body.tags,
  //   user: req.body.user
  // });
  postModel.find({})
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Bad Request",
      });
    });
});


module.exports = router;
