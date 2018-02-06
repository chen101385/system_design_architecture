// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const addUserToQueue = (userId) => {

  const params = {
      DelaySeconds: 1,
      MessageAttributes: {
       "userId": {
         DataType: "Number",
         StringValue: `${userId}`
        }
      },
      MessageBody: `${userId}`,
      QueueUrl: "https://sqs.us-west-2.amazonaws.com/361004913048/job_queue"
     };
  
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
}

// addUserToQueue(10);
// addUserToQueue(11);
// addUserToQueue(12);

  module.exports = {
    addUserToQueue
  }