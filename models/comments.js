const { connection } = require("../db/connection");

function updateComment(id, obj) {
  return connection
  .select('*')
  .from('comments')
  .where('comment_id', '=', id)
  .then(([comment]) => {
    comment.votes += obj.inc_votes;
    // increment votes here
    return comment;
  })
}


/*
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
}*/

  module.exports = { updateComment }