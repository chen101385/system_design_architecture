// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const queueURL = "https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecsOutbox";

const pollQueue = (callback) => {

  const params = {
   AttributeNames: [
      "SentTimestamp"
   ],
   MaxNumberOfMessages: 1,
   MessageAttributeNames: [
      "All"
   ],
   QueueUrl: queueURL,
   VisibilityTimeout: 0,
   WaitTimeSeconds: 0
  };
  
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log("Receive Error sqs.receiveMessage", err);
    } else if (data.Messages) {
      // console.log('THIS IS DATA.MESSAGES.Body', data.Messages[0].Body)
      callback(data.Messages[0].Body)
        //expecting an array of movie_ids
      const deleteParams = {
        //change to queueURL from recommendations service;
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };
      //delete message after receipt
      sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log("Delete Error, deletus erroneous");
        } else {
          console.log("Message Deleted");
        }
      });
    }
  });
}
//tests results queue
pollQueue((results) => console.log(results));

module.exports = {
  pollQueue,
}