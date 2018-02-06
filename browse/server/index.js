//required to use async functions in KOA
const nr = require('newrelic');

const Koa = require('koa'),
    Router = require('koa-router'),
    db = require('../database'),
    axios = require('axios'),
    util = require('util'),
    babelCore = require('babel-core/register');

const app = new Koa(),
    router = new Router();

app.use(router.allowedMethods())
    .use(router.routes())
    .use(require('koa-body')());

//koa body-parser middleware (converts req.body from JSON-to-code)
//ctx.request 
//ctx.response

// app.use(async ctx => {
//     if (ctx.url === '/events') {
//         let event = ctx.request.body;
//         db.addUserEvent(event.user_id, event.movie_id, event.algorithm_id, event.action, event.x, event.y);

//         ctx.response.body = 'Success: event received';
//     }
//   });

// router.post(`/events`, async (ctx, next) => {
//   const userAction = await db.
// })


/** route list
 * user - get: /startbrowsing/:userid
 * user - get: /browsemore/:userid
 * user -get: /seemoviemetadata/:movieid
 */
router.get('/startbrowsing/:userid', async (ctx, next) => {
    // const getUserRecs = util.promisify(db.getUserRecs);
    // const temp = await getUserRecs(ctx.params.userid)
    try {
        const movieIds = await db.getUserRecs(ctx.params.userid);
        ctx.response.body = JSON.stringify(movieIds);
        next();
    } catch(err) {
        console.log('/startbrowsing route ERROR!', err);
        ctx.response.body = err;
        next();
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

