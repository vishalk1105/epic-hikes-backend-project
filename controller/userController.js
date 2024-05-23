const { securePassword } = require("../middleware/middleware.js");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const userRegister = async (req, res) => {
  try {
    const hashPassword = await securePassword(req.body.password);
    const { userName, email, password } = req.body;
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      role: req.body.role,
      password: hashPassword,
    });

    const userData = await User.findOne({ email: req.body.email });
    if (!userName || !email || !password) {
      res.status(200).send({ success: false, msg: "All Fields are Mandetory" });
    } else {
      if (userData) {
        res
          .status(409)
          .send({ success: false, msg: "This email already exits" });
      } else {
        const user_data = await user.save();
        res.status(200).send({ data: user_data });
      }
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "User is not Valid" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).send({ status: false, msg: "Enter Valid Credentials" });
  }

  const userData = await User.findOne({ email });
  if (userData && (await bcryptjs.compare(password, userData.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userData.userName,
          email: userData.email,
          id: userData.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    const response = {
      token: accessToken,
      _id: userData._id,
      userName: userData.userName,
      email: userData.email,
    };
    res.status(200).send({ response });
  } else {
    res
      .status(400)
      .send({ status: false, msg: "Email or Password is not valid" });
  }
};

module.exports = { userRegister, userLogin };
