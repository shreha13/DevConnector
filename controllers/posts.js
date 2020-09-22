const { validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.CreatePost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const post = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: userId,
    });

    await post.save();

    return res.json(post);
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("user", ["name", "avatar"]);

    return res.json(posts);
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("user", [
      "name",
      "avatar",
    ]);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.DeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user != req.userId) {
      return res
        .status(401)
        .json({ msg: "You are not authenticated to delete this post." });
    }
    await post.remove();
    return res.status(301).json({ msg: "Post deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.LikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.likes.filter((i) => i.user.toString() === req.userId).length > 0) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.userId });
    await post.save();

    return res.status(200).json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.UnlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const likeIndex = post.likes.findIndex(
      (i) => i.user.toString() === req.userId
    );

    if (likeIndex === -1)
      return res.status(400).json({ msg: "Post is not liked" });

    post.likes.splice(likeIndex, 1);
    await post.save();

    return res.status(200).json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.AddComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map((i) => i.msg),
        message: "Validation failed!",
      });
    }
    const post = await Post.findById(req.params.postId).populate("user", [
      "name",
      "avatar",
    ]);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = {
      text: req.body.text,
      name: post.user.name,
      avatar: post.user.avatar,
      user: req.userId,
    };

    post.comments.unshift(comment);

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.DeleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (i) => i.id === req.params.commentId
    );

    if (commentIndex === -1)
      return res.status(400).json({ msg: "Comment not found" });

    if (post.comments[commentIndex].user.toString() !== req.userId)
      return res
        .status(401)
        .json({ msg: "You are not authenticated to delete this comment." });

    post.comments.splice(commentIndex, 1);
    await post.save();

    return res.status(200).json(post.comments);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.EditComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map((i) => i.msg),
        message: "Validation failed!",
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (i) => i.id === req.params.commentId
    );

    if (commentIndex === -1)
      return res.status(400).json({ msg: "Comment not found" });

    if (post.comments[commentIndex].user.toString() !== req.userId)
      return res
        .status(401)
        .json({ msg: "You are not authenticated to edit this comment." });

    const commentData = {
      text: req.body.text,
      name: post.user.name,
      avatar: post.user.avatar,
      user: req.userId,
      _id: post.comments[commentIndex]._id,
    };

    post.comments[commentIndex] = commentData;
    await post.save();

    return res.status(200).json(post.comments);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};
