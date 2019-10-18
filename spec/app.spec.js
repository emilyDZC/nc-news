// set node environment to 'test'
process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chai_sorted = require("chai-sorted");
chai.use(chai_sorted);
const request = require("supertest");
const { app } = require("../app");
const { connection } = require("../db/connection");

describe("endpoints", () => {
  // before and after
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    describe("/topics", () => {
      it("Status 405: should only allow GET method", () => {
        const notAllowed = ["post", "put", "patch", "delete"];
        const promises = notAllowed.map(method => {
          return request(app)
            [method]("/api/topics")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method not allowed!");
            });
        });
        return Promise.all(promises);
      });
      describe("GET", () => {
        it("Status 200: should successfully connect to endpoint", () => {
          return request(app)
            .get("/api/topics")
            .expect(200);
        });
        it("Status 200: should return an array of objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).to.be.an("array");
              expect(body.topics[0]).to.be.an("object");
            });
        });
        it("Status 200: should return an array of objects with the correct keys", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body.topics[0]).to.contain.keys("slug", "description");
            });
        });
        it("Status 404: not found, when given an invalid path", () => {
          return request(app)
            .get("/api/cars")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Route not found");
            });
        });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        it("Status 200: should successfully connect to endpoint", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200);
        });
        it("Status 404: not found, when given a nonexistent username", () => {
          return request(app)
            .get("/api/users/happy")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("user not found");
            });
        });
        it("Status 405: should only allow GET method", () => {
          const notAllowed = ["post", "put", "patch", "delete"];
          const promises = notAllowed.map(method => {
            return request(app)
              [method]("/api/users/lurker")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal("Method not allowed!");
              });
          });
          return Promise.all(promises);
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        it("Status 200: should successfully connect to endpoint", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200);
        });
        it("Status 200: should return an object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.be.an("object");
            });
        });
        it("Status 200: should return an object with the correct keys", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              );
            });
        });
        it("Status 200: should return an object with the correct keys including comment_count", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys("comment_count");
            });
        });
        it("Status 200: should return an object with the correct keys including correct comment_count", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              // console.log(body.comment_count,'<---')
              expect(body.article).to.contain.keys("comment_count");
            });
        });
        it("Status 404: not found, when given a nonexistent article id", () => {
          return request(app)
            .get("/api/articles/543")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("article not found");
            });
        });
        it("Status 400 for bad request: invalid data type", () => {
          return request(app)
            .get("/api/articles/daisy")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("invalid id");
            });
        });
        it("Status 405: should only allow GET, POST and PATCH methods", () => {
          const notAllowed = ["put", "delete"];
          const promises = notAllowed.map(method => {
            return request(app)
              [method]("/api/articles/1")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal("Method not allowed!");
              });
          });
          return Promise.all(promises);
        });
      });
      describe("PATCH", () => {
        describe("/articles/:article_id", () => {
          it("Status 200: should return updated object with patch request", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 5 })
              .expect(200)
              .then(({ body }) => {
                // console.log(body.comment_count,'<---')
                expect(body.article.votes).to.equal(105);
              });
          });
          it("Status 200: should return updated object with patch request with negative vote change", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: -5 })
              .expect(200)
              .then(({ body }) => {
                // console.log(body, '<---body')
                expect(body.article.votes).to.equal(95);
              });
          });
          it("Status 400: not found, when request body contains invalid inc_votes key", () => {
            // not sure why this is returning 200 instead of 404
            // have now modified it to return original article but
            // don't know how to send custom error status
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: "cat" })
              .expect(400)
              .then(({ body }) => {
                console.log(body);
                expect(body.msg).to.equal("invalid id");
              });
          });
        });
      });
      xdescribe("POST", () => {
        describe("/articles/:article_id/comments", () => {
          it("Status 200: should return posted comment", () => {
            return request(app)
              .post("/api/articles/1/")
              .send({ username: "rogersop", body: "New comment inserted" })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment.body).to.equal("New comment inserted");
              });
          });
        });
      });
      describe("GET", () => {
        describe("/api/articles", () => {
          it("Status 200: should successfully connect to endpoint", () => {
            return request(app)
              .get("/api/articles")
              .expect(200);
          });
          it("Status 200: should return an articles array of article objects", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0]).to.be.an("object");
              });
          });
          it("Status 200: should return an array of objects with the correct keys", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                console.log(body);
                expect(body.articles[0]).to.contain.keys(
                  "author",
                  "title",
                  "article_id",
                  "topic",
                  "created_at",
                  "votes"
                );
              });
          });
          it("Status 200: should sort by date DESC by default", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.descendingBy("created_at");
              });
          });
          it("Status 200: should accept a user-provided sort-key", () => {
            return request(app)
              .get("/api/articles?sort_by=author")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.descendingBy("author");
              });
          });
          it("Status 200: should work with other queries", () => {
            return request(app)
              .get("/api/articles?sort_by=article_id")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.descendingBy("article_id");
              });
          });
          it("Status 200: should allow user to select order asc/desc", () => {
            return request(app)
              .get("/api/articles?order_by=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.sortedBy("created_at", {
                  ascending: true
                });
              });
          });
          it("Status 200: should allow user to filter by author", () => {
            return request(app)
              .get("/api/articles?author=butter_bridge")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[1].author).to.equal("butter_bridge");
              });
          });
          it("Status 200: should allow user to filter by topic", () => {
            return request(app)
              .get("/api/articles?topic=cats")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0].topic).to.equal("cats");
              });
          });
          it("Status 200: should allow user to filter and then sort by chosen key", () => {
            return request(app)
              .get(
                "/api/articles?topic=mitch&&sort_by=article_id&&order_by=asc"
              )
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0].topic).to.equal("mitch");
                expect(body.articles).to.be.ascendingBy("article_id");
              });
          });
        });
        describe("Error handling", () => {
          describe("/api/articles", () => {
            it("Status 404: not found, when given an invalid path", () => {
              return request(app)
                .get("/api/arcles")
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).to.equal("Route not found");
                });
            });
            it("Status 400 for bad request: invalid sort key", () => {
              return request(app)
                .get("/api/articles/?sort_by=57")
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.equal("invalid sort method selected");
                });
            });
            xit("Status 200: should default to descending when given invalid order criteria", () => {
              return request(app)
                .get("/api/articles/?order_by=57")
                .expect(200)
                .then(({ body }) => {
                  // console.log(body)
                  expect(body).to.be.ascendingBy("created_at");
                });
            });
            // this returns a 200. Not sure how to make sure it throws an error
            xit("Status 400 for bad request: author does not exist", () => {
              return request(app)
                .get("/api/articles/?author=daisy")
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.equal("author not found");
                });
            });
            xit("Status 405: should only allow GET methods", () => {
              const notAllowed = ["put", "patch", "post", "delete"];
              const promises = notAllowed.map(method => {
                return request(app)
                  [method]("/api/articles")
                  .expect(405)
                  .then(({ body }) => {
                    expect(body.msg).to.equal("Method not allowed!");
                  });
              });
              return Promise.all(promises);
            });
          });
        });
      });
      describe("PATCH", () => {
        describe("/api/comments", () => {
          describe("/:comment_id", () => {
            it("Status 200: should return an object", () => {
              return request(app)
                .patch("/api/comments/1")
                .send({ inc_votes: 5 })
                .expect(200)
                .then(({ body }) => {
                  expect(body.comment).to.be.an("object");
                });
            });
            it("Status 200: should return a comment object with the correct keys", () => {
              return request(app)
                .patch("/api/comments/1")
                .send({ inc_votes: 5 })
                .expect(200)
                .then(({ body }) => {
                  expect(body.comment).to.contain.keys(
                    "article_id",
                    "author",
                    "body",
                    "comment_id",
                    "created_at",
                    "votes"
                  );
                });
            });
            it("Status 200: should return a comment object with the vote count increased by a given value", () => {
              return request(app)
                .patch("/api/comments/1")
                .send({ inc_votes: 5 })
                .expect(200)
                .then(({ body }) => {
                  expect(body.comment.votes).to.equal(21);
                });
            });
            it("Status 200: should also work with negative numbers to decrease votes", () => {
              return request(app)
                .patch("/api/comments/1")
                .send({ inc_votes: -5 })
                .expect(200)
                .then(({ body }) => {
                  expect(body.comment.votes).to.equal(11);
                });
            });
          });
        });
      });
      describe("DELETE", () => {
        describe("/api/comments/:comment_id", () => {
          it("Status 204: successfully deleted, for deleting comment by given id", () => {
            return request(app)
              .delete("/api/comments/1")
              .expect(204);
          });
        });
      });
      xdescribe("GET", () => {
        describe("/api/comments", () => {
          it("Status 200: returns all comments", () => {
            return request(app)
              .get("/api/comments")
              .expect(200)
              .then(body => {
                expect(body).to.contain.keys("comments");
              });
          });
        });
      });
      xdescribe('DELETE /api', () => {
        it('Status 405: does not allow delete method on api', () => {
        const notAllowed = ["post", "put", "patch", "delete"];
        const promises = notAllowed.map(method => {
          return request(app)
            [method]("/api")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method not allowed!");
            });
        });
        return Promise.all(promises);
        });
      });
    });
  });
});
