// set node environment to 'test'
process.env.NODE_ENV = 'test';

const {expect} = require("chai");

const request = require("supertest");
const { app } = require("../app");
const { connection } = require("../db/connection");

describe('endpoints', () => {
  // before and after
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    describe('/topics', () => {
     describe('GET', () => {
       it('Status 200: should successfully connect to endpoint', () => {
         return request(app)
         .get('/api/topics')
         .expect(200);
       });
       it('Status 200: should return an array of objects', () => {
         return request(app)
         .get('/api/topics')
         .expect(200)
         .then(({ body }) => {
              expect(body.topics).to.be.an("array");
              expect(body.topics[0]).to.be.an("object");
            });
       });
       it('Status 200: should return an array of objects with the correct keys', () => {
         return request(app)
         .get('/api/topics')
         .expect(200)
         .then(({ body }) => {
              expect(body.topics[0]).to.contain.keys("slug", "description");
            });
       });

     });
      
    });
  });
});