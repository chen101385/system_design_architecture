const express = require('express'),
    app = express(),
    cluster = require('cluster'),
    util = require('util'),
    bodyParser = require('body-parser'),
    db = require('../database'),
    redis = require('../helpers/redisHelpers.js');

if (cluster.isMaster) {
    const numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const app = require('express')();

    //run bodyParser middleware to automatically parse req.body - ready to use;
    app.use(bodyParser.json({ type: `application/json` }));

    //write code here
    app.get('/startbrowsing/:userid', async (req, res) => {
        const getUserRecs = util.promisify(db.getUserRecs);
        // const temp = await getUserRecs(ctx.params.userid)
        let movieIds;
        try {
            if (await redis.existAsync(req.params.userid)) {
                console.log('redis is working!');
                movieIds = await redis.getAsync(req.params.userid);
            } else {
                console.log('redis is NOT working');
                movieIds = await db.getUserRecs(req.params.userid);
                redis.setAsync(req.params.userid, JSON.stringify(movieIds));
                redis.expireAsync(req.params.userid, 600);
            }
            res.status(200).json(movieIds);
        } catch (err) {
            console.log('/startbrowsing route ERROR!', err);
            res.status(404).json(err);
        }
    })

    var server = app.listen(8000, function () {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}