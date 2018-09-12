/**
 * the script assumes a test database is in place with a
 * seed data. The test only GETs from the data and it will not
 * be necessary for the seed data to be deleted after each test
 */

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./init');

const { expect } = chai;

chai.use(chaiHttp);

const testValues = {
  page: 10,
  id: 2,
};

const { page, id } = testValues;

describe('API routes', () => {
  describe('GET /topActiveUsers', () => {
    it('should return an array of top users', (done) => {
      chai.request(app)
        .get('/topActiveUsers')
        .query({ page })
        .end((err, res) => {
          if (err) { return done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          done();
        });
    });
  });

  describe('GET /users', () => {
    it('should return a user information', (done) => {
      chai.request(app)
        .get('/users')
        .query({ id })
        .end((err, res) => {
          if (err) { return done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          done();
        });
    });
  });
});
