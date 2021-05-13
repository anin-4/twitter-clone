const express = require("express");
const router = express.Router();
const User = require("../mongoSchemas/user");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("hello register page here");
});

router.post("/", async (req, res) => {
  //before adding we should make sure that the email is unique
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.json({ permission: false, reason: "duplicate email" });
  //making sure that the user name is also not duplicate
  const userName = await User.findOne({ userName: req.body.userName });
  if (userName)
    return res.json({ permission: false, reason: "duplicate username" });
  //now we need to hash the password before saving the data
  bcrypt.hash(req.body.password, 8, async (err, hash) => {
    if (err) return res.json(err);
    //saving the user into the database
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.json(newUser);
  });
});

module.exports = router;
