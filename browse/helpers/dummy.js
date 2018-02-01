const db = require('../database/index.js');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//saveUserRecs; saveGlobalRecs;


//n is number of data to add to database;
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const userDataGenerator = async () => {

    for (let i = 0; i < 50; i++) {
        let fileNum = i;
        //loop through x # of iterations
        // let unconditionalActions = ["engage", "thumbs up", "thumbs down"];
        // let conditionalActions = ["start", "pause", "resume"]
        let actions = ["engage", "thumbs up", "thumbs down", "start", "pause", "resume"]
        //thumbs up/down boolean?
        //timestamp
        //stop > start;
        //resume > stop

        let csvWriter = createCsvWriter({
            path: __dirname + `/../data/dummydataset${fileNum}.csv`,
            header: [{ id: 'user_id', title: 'user_id' }, { id: 'movie_id', title: 'movie_id' }, { id: 'algo_id', title: 'algo_id' }, { id: 'action', title: 'action' }, { id: 'x', title: 'x' }, { id: 'y', title: 'y' }, { id: 'timestamp', title: 'timestamp' }]
        });

        let records = [];

        for (let j = 0; j <= 20000; j++) {
            let obj = {
                user_id: Math.floor(Math.random() * 100000),
                movie_id: Math.floor(Math.random() * 10000),
                algo_id: Math.floor(Math.random() * 2),
                action: actions[Math.floor(Math.random() * 6)],
                x: Math.floor(Math.random() * 20) - 10,
                y: Math.floor(Math.random() * 20) - 10,
                timestamp: randomDate(new Date(2017, 11, 1), new Date(2018, 2, 1))
            };
            records[j] = obj;
        }
        csvWriter.writeRecords(records)
    }
    //{"user_id" : 123, "movie_id" : 1234, "algorithmId" : 1, "action" : "complete", "x" : 2, "y" : -5, "timestamp" : "2018-01-25TZ00:00:00:00" }
}

//in try-catch block, no data passed into next .then; job completed.
try {
    userDataGenerator().then(() => {
        console.log('data was successfully written to csv file')
    })
} catch (err) {
    console.log(err);
}

const saveUserData = () => {
    user_actions.collection.insert(data, (err, response) => {
        if (err) {
            console.log('error inserting data into DB', err);
        } else {
            console.log('successful entry into db');
        }
    })
}

const saveUserListData = () => {
    user_lists.collection.insert(data, (err, response) => {
        if (err) {
            console.log('error inserting data into DB', err);
        } else {
            console.log('successful entry into db');
        }
    })
}

const saveGlobalListData = () => {
    global_list.collection.insert(data, (err, response) => {
        if (err) {
            console.log('error inserting data into DB', err);
        } else {
            console.log('successful entry into db');
        }
    })
}