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

describe('POST to /api/account', () => {
  it('should return the most recent messages', (done) => {
    const user = {
      token: '',
      accountID: '12345',
    };
    chai
      .request(server)
      .POST('/api/account')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body.username.length).to.be.above(0);
        expect(res.body.accountID).to.equal('12345');
        expect(res.body.cc).to.equal('1111');
      });
    done();
  });
});
