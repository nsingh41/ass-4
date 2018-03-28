'use strict';

const AWS = require('aws-sdk');
const accountSid = 'accountSid'
const authToken = 'authToken'
const client = require('twilio')(accountSid, authToken)

module.exports.sms = (event, context, callback) => {


  client.messages.create(
    {
      to: '',
      from: '+16042275029',
      body: 'file added to s3'
    },
    
 (err, message) => {
      console.log(message.sid)
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "message sent" }),
      }
      callback(null, response);
    }
  )
};