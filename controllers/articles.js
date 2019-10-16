const { fetchArticle, patchArticle } = require("../models/articles");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(result => {
      if (!result) {
        next({ msg: "article not found", status: 404});
      } else {
      res.status(200).send(result);
      }
    })
    .catch(next);  
}

function patchArticleById(req, res, next) {
  const { article_id } = req.params;
  patchArticle(article_id, req.body)
  .then(result => {
    if (!result) {
        next({ msg: "article not found", status: 404});
      } else {
      res.status(200).send(result);
      }
  })
}

module.exports = { getArticleById, patchArticleById };
