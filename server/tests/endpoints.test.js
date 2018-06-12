// const mongoose = require('mongoose');

require('dotenv').config();
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

// Requests account information from API
describe('POST to /api/account', () => {
  it('should return account information', (done) => {
    const user = {
      token: 'token here',
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
  it('should return a server error', (done) => {
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
        expect(res.status).to.equal(400);
        expect(res.body.error.length).to.be.above(0);
      });
    done();
  });
});


// Sends from an account with a CC on file, CC is stored on Stripe.
describe('POST to /api/send-from-account', () => {
  it('should return the most recent messages', (done) => {
    const message = {
      email: 'email@email.com',
      to: process.env.TWILIO_DEST,
      content: 'Hello',
    };
    chai
      .request(server)
      .POST('/api/send-from-account')
      .send(message)
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

describe('POST to /api/send', () => {
  // Stripe elements will send a token, destination phone #, and a message
  it('should send a message to the recipient', (done) => {
    const user = {
      token: 'stripe token',
      to: process.env.TWILIO_DEST,
      content: 'Hello',
    };
    chai
      .request(server)
      .POST('/api/send')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.contain('success');
      });
    done();
  });
  // If token fails to get created
  it('should fail to send a message', (done) => {
    const user = {
      token: '',
      to: process.env.TWILIO_DEST,
      content: 'Hello',
    };
    chai
      .request(server)
      .POST('/api/send')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).to.equal(500);
        expect(res.body).to.contain('success');
      });
    done();
  });
});

describe('POST to /api/send_from_account', () => {

});