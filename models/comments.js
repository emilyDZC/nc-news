const { connection } = require("../db/connection");


function postComment(id, obj) {
  return connection
  .select('*')
  .from('comments')
  .where('article_id', '=', id)
  .update({comment: obj.body})
  .then(([article]) => {
    // console.log(article)
    return article.comment;
  })
}

  module.exports = { postComment }