const { connection } = require("../db/connection");

function fetchAllTopics() {
  return connection
  .select('*')
  .from('topics')
  .then(result => {
    return result;
  })
}

module.exports = { fetchAllTopics }