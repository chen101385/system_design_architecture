const redisClient = require('redis').createClient,
    redis = redisClient(6379, 'localhost'),
    db = require('../database');

//I want this method to retrieve the data from the cache, if it exists, and check the database afterwards.  
const findUserList = (db, redis, title, callback) => {
    redis.get(title, function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
            callback(JSON.parse(reply));
        else {
            //Book doesn't exist in cache - we need to query the main database
            db.collection('text').findOne({
                title: title
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.set(title, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};

const storeUserList = (db, redis, userId, callback) => {
    return new Promise((resolve, reject) => {
        return db.getUserRecs(userId)
    })
    .then((data) => {
      redis.set(userId.toString(), JSON.stringify(data), (err) => {
        if (err) reject('storeUserList errored!', err)
        else resolve(null);
      }) 
    });
};

storeUserList(db, redis, 10, (err) => {
    if (err) console.log('storeUserList ERRORED', err);
    else (console.log('storeUserList WORKED!'))
})

module.exports = {
    findUserList,
    storeUserList,
}