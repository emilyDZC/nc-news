const apiRouter = require("./api-router");
const articlesRouter = require('express').Router();
const { notAllowed } = require("../errors/index");
const { getArticleById, patchArticleById } = require('../controllers/articles')

articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticleById)
.all(notAllowed);

module.exports = articlesRouter