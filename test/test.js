const test = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const sqsResults = require('../browse/queue/resultQueue/receiveMsg.js');
const sqsJobs = require('../browse/queue/jobQueue/sendMsg.js');
const serverHelpers = require('../browse/helpers/serverHelpers.js');
chai.use(chaiHttp);

const homeUrl = `http://localhost:3000`

describe('koa should connect to server & have working endpoints', () => {
    it('should connect to port 3000 on app.listen', () => {
      chai.request(homeUrl).get("/");
    });

    it('API endpoint /startbrowsing should work properly', (done) => {
      chai.request(homeUrl)
      .get(`/startbrowsing/10`)
      .end((err, res) => {
          res.should.have.status(200);
          done();
      });
    });
    
    //THIS TEST DOES NOT PASS YET
    it('API endpoint /getmany should work properly', (done) => {
      chai.request(homeUrl)
      .post(`/getmany`)
      .send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          done();
      });
    });

    it('/startbrowsing/<id> should return a JSON-stringified array of movie_ids', () => {
        chai.request(homeUrl)
        .get(`/startbrowsing/13`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.string;
        });
    }); 
});

describe('Amazon SQS Queue should work properly', () => {
  it('should retrieve a list of movie_id recommendations from results queue when polled', () => {
    sqsResults.pollQueue((result) => {
      should.exist(result);
      //result should be a JSON-string;
      result.should.be.an('string');
    })
  })

  it('function should add an user_id to the recommendations service SQS queue', () => {
    return sqsJobs.addUserToQueue(1).then((data) => {
      expect(data).to.be.an('object');
      expect(data).to.have.property('MessageId');
      expect(data.MessageId).to.be.a('string');
    })
  })
})

// describe('Should be generating user interactions and passing them along to the events service', () => {
//   it('')
// })

describe("routes: index", () => {
  it("/ endpoint should work properly", done => {
    chai
      .request(homeUrl)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});