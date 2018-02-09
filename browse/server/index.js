//required to use async functions in KOA
const nr = require('newrelic');

const Koa = require('koa'),
    Router = require('koa-router'),
    db = require('../database'),
    axios = require('axios'),
    util = require('util'),
    babelCore = require('babel-core/register'),
    redis = require('../helpers/redisHelpers.js');

const app = new Koa(),
    router = new Router();

app.use(router.allowedMethods())
    .use(router.routes())
    .use(require('koa-body')());

app.use(async ctx => {
    if (ctx.url === '/events') {
        let event = ctx.request.body;
        db.addUserEvent(event.user_id, event.movie_id, event.algorithm_id, event.action, event.x, event.y);

        ctx.response.body = 'Success: event received';
    }
});

//FOR SUPERTEST
router.get("/", async ctx => {
    ctx.body = {
        data: "Sending some JSON"
    };
});

router.get('/startbrowsing/:userid', async ctx => {
    // const getUserRecs = util.promisify(db.getUserRecs);
    // const temp = await getUserRecs(ctx.params.userid)
    let movieIds;
    try {
        if (await redis.existAsync(ctx.params.userid)) {
            console.log('redis is working!');
            movieIds = await redis.getAsync(ctx.params.userid);
        } else {
            console.log('redis is NOT working');
            movieIds = await db.getUserRecs(ctx.params.userid);
            redis.setAsync(ctx.params.userid, JSON.stringify(movieIds));
            redis.expireAsync(ctx.params.userid, 600);
        }
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(movieIds);
    } catch (err) {
        console.log('/startbrowsing route ERROR!', err);
        ctx.response.body = err;
    }
})

router.get('/getmovies', async (ctx, next) => {
    //receive movie metadata from movie service
    //replace movie list for user;
    //movie meta-data will be in ctx.request.body
    let movieMeta = ctx.request.body;
    //create a function to add user_id's movielist to DB

    ctx.response.body = 'Success: movie meta-data received';
    next();
})

router.get('/browsemore/:userid', ctx => {
    // ctx.body = ctx.params.userid
    console.log(ctx.params.userid);
    //receive get request from "user"
    //send/receive message from recommendations queue;
    //after receipt of movie_ids list,
    //make a http request to movies service for metadata
    //once I receive movie metadata, i'll post it to the client;
})

app.listen(3000, () => console.log('listening on port 3000'));

/** route list
 * user - get: /startbrowsing/:userid
 * user - get: /browsemore/:userid
 * user -get: /seemoviemetadata/:movieid
 */


