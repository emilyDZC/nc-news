const { updateComment } = require("../models/comments");

function patchCommentById(req, res, next) {
  const { comment_id } = req.params;
  updateComment(comment_id, req.body).then((result) => {
    res.status(200).send(result)
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

module.exports = {patchCommentById}