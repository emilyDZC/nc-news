const apiRouter = require("./api-router");
const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics");
const { notAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(notAllowed);

module.exports = topicsRouter;
