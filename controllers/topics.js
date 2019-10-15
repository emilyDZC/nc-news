const { fetchAllTopics } = require('../models/topics')

// controllers
// 1. deal with request
// 2. invoke model
// 3. send response

function getTopics(req, res, next) {
  fetchAllTopics(req.body)
  .then(topics => {
    res.status(200).send({ topics })
  })
}

module.exports = { getTopics }