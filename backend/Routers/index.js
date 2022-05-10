const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const commentRouter = require('./Comments');
const postRouter = require('./Post');
const likeRouter = require('./Likes');
const freelancingRouter = require("./Freelancing");
const { default: axios } = require("axios");
const updateProfileA = require("./UpdateProfileA");
router.get("/", (req, res) => {
  res.send("Welcome to Molecule");
});

router.get('/news', async (req, res) => {
  try {
    const newsApi= await axios.get('http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=95adeecc8fef42ce84c260c4ee23f0b3')
    // console.log(newsApi.data)
    res.send(newsApi.data)
  } catch(err) {
    console.log(err)
  }
})

router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use('/comment', commentRouter);
router.use('/post', postRouter);
router.use('/updateProfileA', updateProfileA);
router.use('/like', likeRouter);
router.use('/freelancing', freelancingRouter);
module.exports = router;
