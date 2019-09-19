var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

var request = require("request");
var base_url = "http://localhost:3000/connection?login=deprost&password=password"

describe("Hello World Server", function() {
  describe("POST /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
         assert.equal(200, response.statusCode);
      });
    });
  });
});
