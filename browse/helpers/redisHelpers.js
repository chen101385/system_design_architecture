const redis = require('redis'),
client = redis.createClient();

const {promisify} = require('util');

const getAsync = promisify(client.get).bind(client);
//client.get("string")
const setAsync = promisify(client.set).bind(client);
//client.set("key", "string")
const delAsync = promisify(client.del).bind(client);
//client.exists("key")
const existAsync = promisify(client.exists).bind(client);
//client.expire("key", seconds)
const expireAsync = promisify(client.expire).bind(client);

module.exports = {
  getAsync,
  setAsync,
  delAsync,
  existAsync,
  expireAsync
}