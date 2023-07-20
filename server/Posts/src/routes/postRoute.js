const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  CommentOnPost,
  LikePost,
  getUserPost,
  replyCommentOnPost,
} = require("../controllers/PostContoller");
const { sessionHandler } = require("../middlewares/SessionMiddleware");
const postRoute = express.Router();

postRoute.use(sessionHandler)
postRoute.get("/posts", getAllPosts);
postRoute.post("/posts/insert", createPost);
postRoute.put("/posts/:post_id", updatePost);
postRoute.delete("/posts/delete/:post_id", deletePost);
postRoute.get("/posts/:UserName", getUserPost);
postRoute.post("/posts/comment", CommentOnPost);
postRoute.post('/posts/comment/reply',replyCommentOnPost)
postRoute.post("/posts/likePost", LikePost);

module.exports = postRoute;
