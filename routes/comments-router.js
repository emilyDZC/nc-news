const apiRouter = require("./api-router");
const commentsRouter = require("express").Router();
const { patchCommentById, getCommentById } = require('../controllers/comments')
const { deleteCommentById } = require('../controllers/comments')
const { notAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .get(getCommentById)
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(notAllowed);

module.exports = commentsRouter;
