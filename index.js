const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/dbConnection.js");
const userRouter = require("./routes/userRoutes.js");
const postRouter = require("./routes/postsRouter.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
connectDB();
console.log(PORT);

app.use("/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/post", postRouter);
app.listen(PORT, () => {
  console.log(`App  is listening on ${PORT}`);
});
