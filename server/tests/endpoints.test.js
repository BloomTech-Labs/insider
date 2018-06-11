// const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../app');

const { expect } = chai;
// const sinon = require('sinon');

chai.use(chaihttp);

describe('GET to /api/recent_messages', () => {
  it('should return the most recent messages', (done) => {
    chai
      .request(server)
      .get('/api/recent_messages')
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body.length).to.be.above(0);
        expect(res.body).to.be.an.instanceof(Array);
        res.body.forEach((message) => {
          expect(message).to.have.property('timestamp');
          expect(message).to.have.property('message');
          // Add more expects here
        });
      });
    done();
  });
});
