const axios = require('axios'),
    fetch = require('node-fetch'),
    eventHelpers = require('./createEvent'),
    jobQueue = require(`../queue/jobQueue/sendMsg.js`),
    resultQueue = require(`../queue/resultQueue/receiveMsg.js`);

let eventInstance = {};

const getEvent = event => {
    event.user_id = eventHelpers.getUserId();
    event.movie_id = eventHelpers.getMovieId();
    event.algorithm_id = eventHelpers.getAlgorithmId();
    event.action = eventHelpers.getAction();

    if (event.action === 'impression') {
        event.x = eventHelpers.getX();
        event.y = eventHelpers.getY();
    } else {
        event.x = null;
        event.y = null;
    }
}

const sendEvent = () => {

    getEvent(eventInstance);

    let url = `http://127.0.0.1:3000/events`

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(eventInstance),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log('this is sendEvent response', response);
        })
        .catch(err => {
            console.log('this is sendEvent error', err)
        })
}

const startBrowsing = async (userId) => {
    //when a user logs in, push the user's movie recommendations to the UI
    //a GET request to the database that results in a push to the UI;
    let url = `http://127.0.0.1:3000/startbrowsing/${userId}`

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        //convert data into JSON format;
        //returns promise that resolves with result of parsing body-text as JSON;
        //data = response-stream --> data.json() --> 'reads to completion & parses to JSON'
        .then(data => data.json())
        .then(data => {
            //What am I doing with these results?
            let movieList = data[0].movie_list;
            // console.log('this is movieList', movieList);

            fetch(`http://localhost:3000/getmany`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "data": JSON.stringify(movieList)
                }
            })
                //take metadata for movies & serve to the user;
                .then(response => {
                    // console.log('POST to /getmany SUCCESSFUL', response)
                    return response;
                })
                .catch(err => {
                    // console.log('POST to /getmany FAILED', err);
                    return err;
                })
        })
}

const browseMore = async (userId) => {
    // sends userId to recommendations service to get more movies
    // jobQueue.addUserToQueue(userId)


    // how to wait until I get movies back from queue?

    // const movieList = await resultQueue.pollQueue()

    // receives movie_list & immediately sends to movie service for metadata
    // serves up the package of new rec movies & metadata to the user
}

// startBrowsing(13);
// sendEvent();

module.exports = {
    sendEvent,
    startBrowsing,
    browseMore,
    getEvent,
}