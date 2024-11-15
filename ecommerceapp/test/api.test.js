"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjusted to require app.js

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
  it('should return 200 for the homepage', (done) => {
    chai.request(app) // Using app instead of server
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

