const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.securePassword = async (sPassword) => {
  try {
    const hashPassword = await bcrypt.hash(sPassword, 10);
    return hashPassword;
  } catch (err) {
    console.log(err);
  }
};

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token not found" });
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    res.send(err.message);
  }
};
