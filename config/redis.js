require('dotenv').config();

const { promisify } = require('util');
const redis = require('redis');

// connect to redis server
const client = redis.createClient({
  port: process.env.REDPORT
});

client.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
  });
  
  client.on('connect', function (err) {
    console.log('Connected to redis successfully');
  });
  

module.exports = {
  // wrap redis methods in promises
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client)
};