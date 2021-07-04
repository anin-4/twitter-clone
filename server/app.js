const express = require("express");
const app = express();
const login = require("./routes/login");
const register = require("./routes/register");
const tweets = require("./routes/tweets");
const cors = require("cors");
require("dotenv").config();

//connecting to the database
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(
  "mongodb://localhost:27017/twitterclone",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

// middleware
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//home page
app.get("/", (req, res) => {
  res.send("hello world");
});
//routes
app.use("/login", login);

app.use("/register", register);

app.use("/tweets", tweets);

//starting server
app.listen(4000, () => {
  console.log("listening at port 4000");
});
