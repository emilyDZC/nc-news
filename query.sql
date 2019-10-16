\c nc_news

-- SELECT articles.article_id, COUNT(comments.article_id) FROM articles
-- LEFT JOIN comments
-- ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id;  

-- SELECT comments.article_id, COUNT(comments.article_id) AS comment_count FROM comments
-- JOIN articles
-- ON comments.article_id = articles.article_id
-- WHERE comments.article_id = 1
-- GROUP BY comments.article_id;

-- SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles
-- JOIN comments
-- ON articles.article_id = comments.article_id
-- GROUP BY comments.article_id;
-- WHERE article.article_id = 1;

SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles
LEFT JOIN comments 
ON comments.article_id = articles.article_id
GROUP BY articles.article_id;