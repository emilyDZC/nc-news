// set node environment to 'test'
process.env.NODE_ENV = 'test';

const {chai} = require("expect");
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
     });
      
    });
  });
});