'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.upload = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const filesize = record.s3.object.size;
const eventTime = record.eventTime
    const params = {
      TableName: 'special',
      Item: {
        id: uuid.v1(),
        Name: filename,
        size: filesize,
eventTime: eventTime
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      let twilio = {
        FunctionName: 'navjot-dev-message',
        Payload: JSON.stringify({ filename: filename })
      }
      const lambda = require('aws-lambda-invoke');
      lambda.invoke(twilio, (err, response) => {
        if(err) {
          console.log(err)
          return
        }
        console.log(response)
      })
    })

  });
};