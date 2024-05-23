const Posts = require("../models/postModels.js");
const User = require("../models/userModel.js");
const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Posts.find();
  } catch (err) {
    console.log(err);
  }
  if (!posts) {
    return res.status(404).send({ status: false, msg: "No Posts Found" });
  }
  return res.status(200).send({ status: true, data: posts });
};

const getAllPostsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const postsById = await Posts.find({ userId: userId });

    if (postsById) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        msg: "success",
        data: postsById,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      msg: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    let post;
    const { userId, description, userName } = req.body;
    if (!req.file) {
      res.status(400).send({ status: false, msg: "Add Images" });
    } else {
      post = new Posts({
        userId: userId,
        userName: userName,
        description: description,
        image: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      });
      const post_data = await post.save();
      res.status(200).send({ data: post_data });
    }
  } catch (err) {
    res.status(400).send({ status: false, msg: "Something went wrong" });
    console.log(err);
  }
};

const deletepostById = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const postData = await Posts.findOne({ _id: postId });
    if (!postData) {
      res.status(400).send("No post found");
    }
    if (userId && postId) {
      if (postData.userId == userId) {
        const deletedPost = await Posts.findByIdAndDelete(postId);
        res.status(200).send({
          status: true,
          msg: "Post deleted successfully",
          data: deletedPost,
        });
      } else {
        res.status(404).send({ status: false, msg: "Post not Found" });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getpostById = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const postData = await Posts.findOne({ _id: postId });
    if (!postData) {
      res.status(400).send("No post found");
    }
    if (userId && postId) {
      if (postData.userId == userId) {
        res.status(200).send({
          status: true,
          msg: "Post find successfully",
          data: postData,
        });
      } else {
        res.status(404).send({ status: false, msg: "Post not Found" });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updatePostByID = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const body = req.body;
    const description = body.description;

    const updates = {
      description,
    };

    if (req.file) {
      const image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      updates.image = image;
    }

    const updatedPost = await Posts.findOneAndUpdate(
      { _id: postId, userId: userId }, //filteration
      {
        $set: updates,
      },
      {
        new: true,
      }
    );
    if (updatedPost) {
      res.status(200).send({
        status: true,
        msg: "Post updated successfully",
        data: updatedPost,
      });
    } else {
      res.status(404).send({ status: false, msg: "Post not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getAllPostsById,
  deletepostById,
  getpostById,
  updatePostByID,
};
