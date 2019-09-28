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
var app = 'localhost:8080';

var requester = chai.request(app).keepOpen()

Promise.all([
  requester.get('/a'),
  requester.get('/b'),
])
.then(() => requester.close())

describe("Sample Unit Testing", function() {
    describe("Get User Data", function() {
        it("send identifiants", function(done) {
            // Send some Form Data
             chai.request(app).keepOpen()
            .post('/connection')
            .send({
            login: 'deprost',
            password: 'password',
            })
            .end(function (err, res) {
              expect(err).to.be.null;
              console.log(res);
              expect(res).to.have.status(200);
              done();
            });
        });

    });
});
