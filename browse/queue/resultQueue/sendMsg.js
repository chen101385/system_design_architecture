// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-west-2' });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = "https://sqs.us-west-2.amazonaws.com/361004913048/result_queue"

const sendMessage = (userId) => {
  const params = {
    DelaySeconds: 1,
    MessageAttributes: {
      "userId": {
        DataType: "Number",
        StringValue: `${userId}`
      }
    },
    MessageBody: `${userId}`,
    QueueUrl: queueURL,
  }

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
}

sendMessage(11);
sendMessage(12);
sendMessage(13);
sendMessage(14);
sendMessage(15);

module.exports = {
  sendMessage,
}


