const { fetchArticle, patchArticle, fetchArticles } = require("../models/articles");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(result => {
      if (!result) {
        next({ msg: "article not found", status: 404 });
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
        next({ msg: "article not found", status: 404 });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(next);
}

function sendAllArticles(req, res, next) {
  console.log(req.query, '<--- query')
  fetchArticles(req.query)
    .then(result => {
      if (!result) next(result);
      console.log(result)
      res.status(200).send(result)
    })
    .catch(next);
}

module.exports = { getArticleById, patchArticleById, sendAllArticles };
