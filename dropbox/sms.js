'use strict';

const AWS = require('aws-sdk');
const accountSid = 'AC6bca12313b4e1c62ab86293b163fc8b2'
const authToken = '1ba6036cff91a64f4ff01a53e54c0e97'
const client = require('twilio')(accountSid, authToken)

module.exports.sms = (event, context, callback) => {


  client.messages.create(
    {
      to: '+17789524383',
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