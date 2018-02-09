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
      chai.request(homeUrl).get('/');
    });

    it('API endpoint /startbrowsing should work properly', (done) => {
      chai.request(homeUrl)
      .get(`/startbrowsing/100`)
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

describe('should post user-interactions to events service via /events endpoint', () => {
  it('createEvents function should be creating user interaction events', () => {
    //start with an empty object
    let testEvent = {}
    //decorate the testEvent object to resemble a user interaction with the UI;
    serverHelpers.getEvent(testEvent)
    console.log('this is testEvent', testEvent)
    expect(testEvent).to.be.a('object');
    expect(testEvent.action).to.be.a('string');
    expect(testEvent.user_id).to.be.a('number');
    expect(testEvent.movie_id).to.be.a('number');
    expect(testEvent.algorithm_id).to.be.a('number');
  })
  
  it('/events endpoint should be working properly', () => {
    chai.request(homeUrl)
    .post(`/events`)
    .field('user_id', '1234')
    .field('movie_id', '1234')
    .field('algorithm_id', '1')
    .field('action', 'impression')
    .field('x', '10')
    .field('x', '-10')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.string;
    });
  }); 
})

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

describe("testing routes: index", () => {
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

/**
 * ADDITIONAL TESTS:
 * 
 */