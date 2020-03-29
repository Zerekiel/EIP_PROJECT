var assert = require('assert');
var request = require("request");
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var app = 'healthsafe-api.herokuapp.com';

var requester = chai.request(app).keepOpen()

// Promise.all([
//   requester.get('/a'),
//   requester.get('/b'),
// ])
// .then(() => requester.close())

describe("GET /wrongpath", function() {
    it("Should return status 404", function(done) {
         chai.request(app).keepOpen()
        .post('/wrongpath')
        // .send({
        //   login: 'abc',
        //   password: 'abc',
        // })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
});

describe("GET /", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});

describe("GET /api/stock", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/api/stock')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});

describe("GET /api/signin", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/api/signin')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });
});

describe("GET /api/signup", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/api/signup')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});

describe("GET /api/connexion", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/api/connexion')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});

// describe("POST /api/signup", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/signup')
//         .send({
//           userName: 'deprost',
//           password: 'password',
//         })
//
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });


describe("GET /api", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/api')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});

describe("GET /sawgger.json", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .get('/swagger.json')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});

// describe("POST /api/signup", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/signup')
//         .send({
//           login: 'deprost',
//           password: 'password',
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });


// describe("POST /api/stock", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/stock')
//         .send({
//           message: 'hello world',
//           nom: 'dupont',
//           ville: 'paris',
//           taille: 165,
//           methode: 'x'
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(404);
//           done();
//         });
//     });
// });
