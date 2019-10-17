const apiRouter = require("./api-router");
const articlesRouter = require('express').Router();
const { notAllowed } = require("../errors/index");
const { getArticleById, patchArticleById, sendAllArticles } = require('../controllers/articles')
const { postComment } = require('../controllers/comments')

articlesRouter.get('/', sendAllArticles)
.all(notAllowed);

articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticleById)
// .post(postComment)
.all(notAllowed);

module.exports = articlesRouter