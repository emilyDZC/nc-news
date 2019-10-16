const apiRouter = require("./api-router");
const usersRouter = require("express").Router();
const { getTopics } = require("../controllers/topics");
const { notAllowed } = require("../errors/index");
const { getUser } = require('../controllers/users')

usersRouter.route('/:username')
.get(getUser)
.all(notAllowed);    

module.exports = usersRouter;