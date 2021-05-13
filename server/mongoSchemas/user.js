const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  userName: String,
  email: {
    type: String,
  },
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "tweets",
    },
  ],
});

module.exports = mongoose.model("User", User);
