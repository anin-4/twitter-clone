const express = require("express");
const router = express.Router();
const User = require("../mongoSchemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("hello login page here");
});

router.post("/", async (req, res) => {
  //will check where the username is present in the db and also whether the username and password match
  const { userName, password } = req.body;
  const isUser = await User.findOne({ userName: userName });
  if (isUser) {
    const dbpassword = isUser.password;
    const isPassword = await bcrypt.compare(password, dbpassword);
    if (isPassword) {
      const token = jwt.sign(userName, process.env.ACCESS_TOKEN);
      res.json({ authorization: token, login: success });
    } else {
      res.json({ password: "error" });
    }
  } else {
    res.json({ signup: true });
  }
});
module.exports = router;
