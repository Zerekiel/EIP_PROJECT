var assert = require('assert');
var request = require("request");
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var app = 'healthsafe-api.herokuapp.com';

var requester = chai.request(app).keepOpen()

describe("GET /wrongpath", function() {
    it("Should return status 404", function(done) {
         chai.request(app).keepOpen()
        .post('/wrongpath')
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
    it("Should return status 201", function(done) {
         chai.request(app).keepOpen()
        .get('/api/signin')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });
});

// describe("POST /api/signin", function() {
//     it("Should return status 201", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/signin')
//         .send({
//           userName: 'OldBoy',
//           password: 'password'
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });

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

// describe("GET /api/connexion", function() {
//   it("Should return status 200", function(done) {
//     chai.request(app).keepOpen()
//     .get('/api/connexion')
//     .end(function (err, res) {
//       expect(err).to.be.null;
//       expect(res).to.have.status(200);
//       expect(res).to.not.be.null;
//       done();
//     });
//   });
// });

// describe("POST /api/connexion", function() {
//   it("Should return status 200", function(done) {
//     chai.request(app).keepOpen()
//     .post('/api/connexion')
//     .send({
//       login: 'abc',
//       password: 'abc',
//     })
//     .end(function (err, res) {
//       expect(err).to.be.null;
//       expect(res).to.have.status(200);
//       expect(res).to.not.be.null;
//       done();
//     });
//   });
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

// describe("GET /api/signin/me", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .get('/api/signin/me')
//           .send({
//           userName: 'Deprost',
//           password: 'password',
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });

// describe("POST /api/signin/create", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/signin/create')
//         .send({
//           userName: 'Denis',
//           password: 'password',
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });


// describe("GET /api/logout", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/logout')
//         .send({
//           login: 'Deprost',
//           password: 'password',
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });

// describe("POST /api/logout/logoutall", function() {
//     it("Should return status 200", function(done) {
//          chai.request(app).keepOpen()
//         .post('/api/logout/logoutall')
//         .send({
//           userName: 'OldBoy',
//           password: 'password',
//         })
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
// });


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

describe("POST /api/stock", function() {
    it("Should return status 500", function(done) {
         chai.request(app).keepOpen()
        .post('/api/stock')
        .send({
          lastName: "Clement",
          firstName: "Deproost",
          age: 23,
          gender: "Femme",
          emergencyNumber: 17314053,
          allergies: "aucune",
          medicalHistory: "Autisme, Gill de la tourette.",
          bloodType: "A+",
          socialNumber: 854237589204,
          treatments: "On ne peut rien faire pour lui.",
          organDonation: "OUI",
          doctor: "Dr.Chopin"
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          done();
        });
    });
});


describe("DELETE /api/stock", function() {
    it("Should return status 200", function(done) {
         chai.request(app).keepOpen()
        .delete('/api/stock')
        .send({
          _id: "5ddaa8468ebb8d8107e3288a",
          lastName: "Clement",
          firstName: "Deproost",
          age: 23,
          gender: "Femme",
          emergencyNumber: 17314053,
          allergies: "aucune",
          medicalHistory: "Autisme, Gill de la tourette.",
          bloodType: "A+",
          socialNumber: 854237589204,
          treatments: "On ne peut rien faire pour lui.",
          organDonation: "OUI",
          doctor: "Dr.Chopin"
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
});
