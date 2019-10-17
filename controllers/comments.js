const { updateComment, removeComment } = require("../models/comments");

function patchCommentById(req, res, next) {
  const { comment_id } = req.params;
  updateComment(comment_id, req.body).then((result) => {
    res.status(200).send(result)
  })
}

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.status(204).send({msg: 'comment deleted'})
  })
}

/*
function postComment(req, res, next) {
  const { article_id } = req.params;
  const { body } = req.body;
  postComment(article_id, body)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(next);
}*/

module.exports = { patchCommentById, deleteCommentById }