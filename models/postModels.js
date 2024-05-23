const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  userName: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", postSchema);
