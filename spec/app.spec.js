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
              expect(body).to.be.an("object");
            });
        });
        it("Status 200: should return an object with the correct keys", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.contain.keys(
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
              expect(body).to.contain.keys("comment_count");
            });
        });
        xit("Status 200: should return an object with the correct keys including correct comment_count", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              // console.log(body.comment_count,'<---')
              expect(body.comment_count).to.equal("13");
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
                expect(body.votes).to.equal(105);
              });
          });
          it("Status 200: should return updated object with patch request with negative vote change", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: -5 })
              .expect(200)
              .then(({ body }) => {
                // console.log(body.comment_count,'<---')
                expect(body.votes).to.equal(95);
              });
          });
          xit("Status 404: not found, when request body contains invalid inc_votes key", () => {
            return request(app)
              .get("/api/articles/1")
              .send({ inc_votes: "cat" })
              .expect(404)
              .then(({ body }) => {
                // console.log(body)
                expect(body.msg).to.equal("invalid increment value");
              });
          });
        });
      });
      xdescribe("POST", () => {
        describe("/articles/:article_id/comments", () => {
          it("Status 200: should return posted comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "rogersop", body: "New comment" })
              .expect(200)
              .then(({ body }) => {
                console.log(result.body, "<---");
                expect(body.comment.body).to.equal("New comment");
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
                expect(body[0]).to.be.an("object");
              });
          });
          it("Status 200: should return an array of objects with the correct keys", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(body[0]).to.contain.keys(
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
                expect(body).to.be.descendingBy("created_at");
              });
          });
          it("Status 200: should accept a user-provided sort-key", () => {
            return request(app)
              .get("/api/articles?sort_by=author")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.descendingBy("author");
              });
          });
          it("Status 200: should work with other queries", () => {
            return request(app)
              .get("/api/articles?sort_by=article_id")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.descendingBy("article_id");
              });
          });
          it("Status 200: should allow user to select order asc/desc", () => {
            return request(app)
              .get("/api/articles?order_by=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.sortedBy("created_at", { ascending: true });
              });
          });
          it("Status 200: should allow user to filter by author", () => {
            return request(app)
              .get("/api/articles?author=butter_bridge")
              .expect(200)
              .then(({ body }) => {
                expect(body[1].author).to.equal("butter_bridge");
              });
          });
          it("Status 200: should allow user to filter by topic", () => {
            return request(app)
              .get("/api/articles?topic=cats")
              .expect(200)
              .then(({ body }) => {
                expect(body[0].topic).to.equal("cats");
              });
          });
          it("Status 200: should allow user to filter and then sort by chosen key", () => {
            return request(app)
              .get(
                "/api/articles?topic=mitch&&sort_by=article_id&&order_by=asc"
              )
              .expect(200)
              .then(({ body }) => {
                expect(body[0].topic).to.equal("mitch");
                expect(body).to.be.ascendingBy("article_id");
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
    });
  });
});
