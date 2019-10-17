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
    // console.log(article);
    return article;
  })
}

function patchArticle(id, obj) {
  return connection
  .select('*')
  .from('articles')
  .where('article_id', '=', id)
  .then(([article]) => {
    article.votes += obj.inc_votes;
    // console.log(article)
    // increment votes here
    return article;
  })
}

function fetchArticles({sort_by = 'created_at', order_by = 'desc', author, topic}) {
 /* if (author) {
    return connection
    .select('*')
    .from('articles')
    .where('author', '=', author)
    .then((articles) => {
    console.log(articles)
    return articles
  })
  }*/
  
  return connection
  .select('*')
  .from('articles')
  .modify((query) => {
      if (author) query.where('author', '=', author);
      if (topic) query.where('topic', '=', topic)
    })
  .orderBy(sort_by, order_by)
  .then((articles) => {
    // console.log(articles)
    return articles
  })
}

/*
function patchArticle(id, obj) {
  return connection
  .select('*')
  .from('articles')
  .where('article_id', '=', id)
  .update({ votes: articles.votes += obj.inc_votes})
  .then(([article]) => {
    
    // article.votes += obj.inc_votes;
    console.log(article)
    // increment votes here
    return article;
  })
}*/

module.exports = { fetchArticle, patchArticle, fetchArticles }
