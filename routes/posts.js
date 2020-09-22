const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authMiddleware = require("../middleware/Auth");
const postController = require("../controllers/posts");

//@route    /api/posts
//@desc     Create post
//@access   Private
router.post(
  "/",
  [authMiddleware],
  [check("text", "Text is a required field").trim().not().isEmpty()],
  postController.CreatePost
);

//@route    /api/posts
//@desc     Get posts
//@access   Private
router.get(
  "/",
  [authMiddleware],
  postController.getPosts
);

//@route    /api/posts/:postId
//@desc     Get post by id
//@access   Private
router.get(
  "/:postId",
  [authMiddleware],
  postController.getPostById
);

//@route    /api/posts/:postId
//@desc     delete post by id
//@access   Private
router.delete(
  "/:postId",
  [authMiddleware],
  postController.DeletePost
);

//@route    /api/posts/like/:postId
//@desc     Add like
//@access   Private
router.put(
  "/like/:postId",
  [authMiddleware],
  postController.LikePost
);

//@route    /api/posts/unlike/:postId
//@desc     Add like
//@access   Private
router.put(
  "/unlike/:postId",
  [authMiddleware],
  postController.UnlikePost
);

//@route    /api/posts/comment/:postId
//@desc     Add comment
//@access   Private
router.put(
  "/comment/:postId",
  [authMiddleware],
  [check('text', "Text is a required field").trim().not().isEmpty()],
  postController.AddComment
);

//@route    /api/posts/comment/:postId/:commentId
//@desc     Delete comment
//@access   Private
router.delete(
  "/comment/:postId/:commentId",
  [authMiddleware],
  postController.DeleteComment
);


//@route    /api/posts/comment/:postId/:commentId
//@desc     Edit comment
//@access   Private
router.post(
  "/comment/:postId/:commentId",
  [authMiddleware],
  postController.EditComment
);

module.exports = router;
