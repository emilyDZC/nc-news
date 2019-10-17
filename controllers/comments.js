const { fetchArticle, patchArticle } = require("../models/articles");



function postComment(req, res, next) {
  const { article_id } = req.params;
  const { body } = req.body;
  postComment(article_id, body)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(next);
}

module.exports = {postComment}