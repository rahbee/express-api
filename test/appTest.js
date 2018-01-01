import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import request from 'supertest';
import app from '../app';

/* eslint-env mocha */

chai.should();
chai.use(chaiHttp);

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});
