const express = require("express");
const {
  getAllPosts,
  createPost,
  getAllPostsById,
  deletepostById,
  updatePostByID,
  getpostById,
} = require("../controller/postsController.js");
const upload = require("../middleware/postUploadMiddleware.js");
const bodyParser = require("body-parser");
const { verifyToken } = require("../middleware/middleware.js");

const postRouter = express.Router();
postRouter.use(bodyParser.urlencoded({ extended: true }));
postRouter.use(bodyParser.json());

postRouter.get("/post-list", verifyToken, getAllPosts);
postRouter.get("/post-list/:userId", verifyToken, getAllPostsById);
postRouter.post(
  "/create-post",
  verifyToken,
  upload.single("image"),
  createPost
);
postRouter.delete("/delete/:userId/:postId", verifyToken, deletepostById);
postRouter.get("/get/:userId/:postId", verifyToken, getpostById);
postRouter.put(
  "/update/:userId/:postId",
  verifyToken,
  upload.single("image"),
  updatePostByID
);

module.exports = postRouter;
