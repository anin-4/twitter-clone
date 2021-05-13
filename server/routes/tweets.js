const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tweets = require("../mongoSchemas/tweets");
const User = require("../mongoSchemas/user");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    const accessToken = token.split(" ")[1];
    const verifyToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    req.user = verifyToken;
  } else res.sendStatus(403);
  next();
};

router.get("/", async (req, res) => {
  //this will show all the tweets in the data base
  const Tweets = await tweets.find({});
  res.json(Tweets);
});

router.get("/new", verifyToken, async (req, res) => {
  res.json({ allowNewTweet: true });
});

router.post("/", verifyToken, async (req, res) => {
  //the tweet will be posted into the database
  const Tweet = req.body.tweet;
  const user = await User.findOne({ userName: req.user });
  const newtweet = new tweets({
    tweet: Tweet,
    user: user._id,
  });
  const savedTweet = await newtweet.save();
  await user.tweets.push(savedTweet);
  await user.save();

  res.json(savedTweet);
});

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const neededTWeet = await tweets.findById(id).populate("user");
  res.json({ neededTWeet });
});

router.get("/:id/edit", verifyToken, async (req, res) => {
  res.json({ allowModification: true });
});

router.patch("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const updatedTweet = await tweets.findByIdAndUpdate(id, {
    tweet: req.body.tweet,
  });
  await updatedTweet.save();
  res.json(updatedTweet);
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await tweets.findByIdAndDelete(req.params.id);
    return res.json({ deleted: true });
  } catch (e) {
    console.log(e);
    return res.json({ deleted: false });
  }
});
module.exports = router;
