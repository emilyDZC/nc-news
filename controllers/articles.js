const { fetchArticle, patchArticle, fetchArticles } = require("../models/articles");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(article => {
      if (!article) {
        next({ msg: "article not found", status: 404 });
      } else {
        res.status(200).send({article});
      }
    })
    .catch(next);
}

function patchArticleById(req, res, next) {
  const { article_id } = req.params;
  patchArticle(article_id, req.body)
    .then(article => {
      // if (article.msg === 'invalid data type') next({msg: 'invalid request', status:404});
      if (!article || article.msg === 'invalid data type') {
        next({ msg: "article not found", status: 404 });
      } else {
        res.status(200).send({article});
      }
    })
    .catch(next);
}

function sendAllArticles(req, res, next) {
  // console.log(req.query, '<--- query')
  fetchArticles(req.query)
    .then(articles => {
      // console.log(articles[0])
      if (!articles) next(articles);
      res.status(200).send({articles})
    })
    .catch(next);
}

module.exports = { getArticleById, patchArticleById, sendAllArticles };
