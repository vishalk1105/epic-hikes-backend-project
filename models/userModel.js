const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    reuired: [true, "Enter User Name"],
  },
  email: {
    type: String,
    required: [true, "Enter Email Address"],
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Enter Password"],
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", userSchema);
