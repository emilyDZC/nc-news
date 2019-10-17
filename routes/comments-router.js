const apiRouter = require("./api-router");
const commentsRouter = require("express").Router();
const { patchCommentById } = require('../controllers/comments')
const { notAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .all(notAllowed);

module.exports = commentsRouter;
