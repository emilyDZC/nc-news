const { updateComment, removeComment, addComment, getComment } = require("../models/comments");

function patchCommentById(req, res, next) {
  const { comment_id } = req.params;
  updateComment(comment_id, req.body).then(comment => {
    console.log({comment})
    res.status(200).send({comment})
  })
}

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.status(204).send({msg: 'comment deleted'})
  })
}


function postComment(req, res, next) {
  const { article_id } = req.params;
  const { body } = req.body;
  console.log(article_id, body)
  addComment(article_id, body)
  .then(comment => {
    res.status(201).send({comment});
  })
  .catch(next);
}

function getCommentById(req, res, next) {
  fetchAllComments().then(comments => {
    res.status(200).send({comments});
  })
}

module.exports = { postComment, patchCommentById, deleteCommentById, getCommentById }