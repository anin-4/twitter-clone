const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tweets = new Schema({
  tweet: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("tweets", Tweets);
