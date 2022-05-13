const express = require("express");
const router = express.Router();
const postModel = require("../Models/Post");
const likesModel = require("../Models/Likes");
const postCommentModel = require("../Models/postComment");
const postCommentLikeModel = require("../Models/postCommentLike");

const multer  = require('multer');
const { db } = require("../Models/Likes");
const { default: mongoose } = require("mongoose");
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

const bindCommentsData = async (postId) => {
  let comments = await postCommentModel.find({ postId: mongoose.Types.ObjectId(postId) }).lean();
  for (let i = 0; i < comments.length; i++) {
    let commentLikes = await postCommentLikeModel.findOne({ commentId: mongoose.Types.ObjectId(comments[i]._id.toString()) });
    if (commentLikes) {
      comments[i].likes = commentLikes.likes;
    }
  }

  return comments;

}

router.post("/", imageUpload.single('image'), async (req, res) => {
  try {
    console.log("file_name", req.file);
    const model = new postModel({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      user: JSON.parse(req.body.user) || {},
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
  } catch (e) {
    res.status(500).send({ message: 'Internal Server error ' + e.message });
  }
});

router.get("/filter/:search", async (req, res) => {
  
  let regex = new RegExp(req.params.search,'i');

  postModel.find({ $and: [ { $or: [{title: regex },{description: regex}] } ] } ).lean()
    .then(async (doc) => {
      try {
        for (let i = 0; i < doc.length; i ++) {
          let likesData = await likesModel.findOne({ post: doc[i]._id }).lean();
          doc[i]['likes'] = [];
          if (likesData) {
            doc[i]['likes'] = likesData.likes
          }
          doc[i]['comments'] = await bindCommentsData(doc[i]._id);
        }
          res.status(200).send(doc);
      } catch (errrr) {
        throw errrr;
      }
      
    })
    .catch((err) => {
      res.status(400).send({
        message: "Bad Request " + err.message,
        err
      });
    });
});

router.get("/", async (req, res) => {
  postModel.find({}).lean()
    .then(async (doc) => {
      try {
        for (let i = 0; i < doc.length; i ++) {
          let likesData = await likesModel.findOne({ post: doc[i]._id }).lean();
          doc[i]['likes'] = [];
          if (likesData) {
            doc[i]['likes'] = likesData.likes
          }
          doc[i]['comments'] = await bindCommentsData(doc[i]._id.toString());
        }
          res.status(200).send(doc);
      } catch (errrr) {
        throw errrr;
      }
      
    })
    .catch((err) => {
      res.status(400).send({
        message: "Bad Request",
        err
      });
    });
});

router.get("/:id", async (req, res) => {
  postModel.findOne({ _id: req.params.id }).lean()
    .then(async (doc) => {
      try {
        
          let likesData = await likesModel.findOne({ post: doc._id }).lean();
          doc['likes'] = [];
          if (likesData) {
            doc['likes'] = likesData.likes
          }
          doc['comments'] = await bindCommentsData(doc._id.toString());
        
          res.status(200).send(doc);
      } catch (errrr) {
        throw errrr;
      }
      
    })
    .catch((err) => {
      res.status(400).send({
        message: "Bad Request",
        err
      });
    });
});


module.exports = router;
