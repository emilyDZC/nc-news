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

function removeComment(id) {
  return connection
  .delete('*')
  .from('comments')
  .where('comment_id', '=', id);
}

function addComment(id, obj) {
  console.log(id, obj)
  return connection
  .select('*')
  .from('comments')
  .where('article_id', '=', id)
  .insert({comment: obj.body})
  .then(([article]) => {
    // console.log(article)
    return article.comment;
  })
}

  module.exports = { addComment, updateComment, removeComment }