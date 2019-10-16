const { connection } = require("../db/connection");
/*
function fetchArticle(id) {
  return connection
  .select('*')
  .from('articles')
  .where('article_id', '=', id)
  .then(([article]) => {
    return article;
  })
}*/

function fetchArticle(id) {
  return connection
  .select('articles.*')
  .from('articles')
  .count({comment_count: 'comment_id'})
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id')
  .where('articles.article_id', '=', id)

  .then(([article]) => {
    // console.log(article)
    return article;
  })
}

module.exports = { fetchArticle }
