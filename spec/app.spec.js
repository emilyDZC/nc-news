// set node environment to 'test'
process.env.NODE_ENV = "test";

const { expect } = require("chai");

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
    describe('/users', () => {
      describe('/:username', () => {
        it('Status 200: should successfully connect to endpoint', () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200);
        });
        xit('Status 404: not found, when given a nonexistent username', () => {
          return request(app)
            .get("/api/users/happy")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Route not found");
            })
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
  });

});
