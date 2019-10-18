const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const {
  formatDates,
  formatComments,
  makeRefObj,
  renameKeys
} = require("../utils/utils");

exports.seed = function(connection) {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      return connection
        .insert(topicData)
        .into("topics")
        .returning("*")
        .then(topicData => {
          // console.log(topicData)
        })
        .then(() => {
          return connection
            .insert(userData)
            .into("users")
            .returning("*")
            .then(userData => {
              // console.log(userData)
            });
        })
        .then(() => {
          const formattedArticles = articleData.map(obj => {
            obj.created_at = new Date(obj.created_at);
            return obj;
          });
          // console.log(formattedArticles);
          return connection
            .insert(formattedArticles)
            .into("articles")
            .returning("*");
        })
        .then(articleRows => {
          const refObj = makeRefObj(articleRows);
          const formattedComments = renameKeys(
            commentData,
            "created_by",
            "author"
          );
          const formattedComments2 = renameKeys(
            formattedComments,
            "belongs_to",
            "article_id"
          );
          const formattedComments3 = formattedComments2.map(obj => {
            obj.created_at = new Date(obj.created_at);
            return obj;
          });
          const finalFormattedComments = formattedComments3.map(obj => {
            let keyToFind = obj.article_id;
            obj.article_id = refObj[keyToFind];
            return obj;
          });

          return connection
            .insert(finalFormattedComments)
            .into("comments")
            .returning("*");
        })
        .then(insertedComments => {
          // console.log(insertedComments);
        });
    });
};
/*

{
  const topicsInsertions = connection('topics').insert(topicData);
  const usersInsertions = connection('users').insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      /* 
      
      Your article data is currently in the incorrect format and will violate your SQL schema. 
      
      You will need to write and test the provided formatDate utility function to be able insert your article data.

      Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
      */
/*  })
    .then(articleRows => {
      /* 

      Your comment data is currently in the incorrect format and will violate your SQL schema. 

      Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
      
      You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
      */
/*
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex('comments').insert(formattedComments);
    });
};
*/
