var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

var request = require("request");
var assert = require("assert");
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var app = 'localhost:3000';

var requester = chai.request(app).keepOpen()

Promise.all([
  requester.get('/a'),
  requester.get('/b'),
])
.then(() => requester.close())

describe("Test wrong route", function() {
    describe("Should return status 404", function() {
        it("", function(done) {
            // Send some Form Data
             chai.request(app).keepOpen()
            .post('/wrongpath')
            .send({
              login: 'abc',
              password: 'abc',
            })
            .end(function (err, res) {
              expect(err).to.be.null;
              // console.log(res);
              expect(res).to.have.status(404);
              done();
            });
        });

    });
});
