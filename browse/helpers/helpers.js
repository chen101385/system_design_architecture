const axios = require('axios');
const db = require('../database/index.js');
//saveUserRecs; saveGlobalRecs;

const testFunction = (description) => {
  axios.post('/', {
    user_id: 1,
        algo_id: 1,
        movie_list:  [{
            Movie_id: 1,
            Title: 'testString',
            Category: 'testString',
            Description: description,
            Length: 'testString',
            Year: 2018,
            Director: 'testString',
            Key_actors: ['testString'],
            Critical_acclaim: true,
            Language: 'testString',
            Thumbnail: ['testString']
            }]
  })
  .then(response => console.log(response))
  .catch(error => console.log(error))
}

//n is number of data to add to database;
const userDataGenerator = (n) => {
    //loop through x # of iterations
    let unconditionalActions = ["engage", "thumbs up", "thumbs down"];
    let conditionalActions = ["start", "pause", "resume"]
    //thumbs up/down boolean?
    //timestamp
      //stop > start;
      //resume > stop
    let data = [];

    for (let i = 0; i < n; i++) {
        let obj = {};
        obj.user_id = 1;
        obj.movie_id = 1;
        obj.algo_id = 1;
        obj.action = unconditionalActions[Math.floor(Math.random() * 3)];
        obj.x = Math.floor(Math.random() * 100);
        obj.y = Math.floor(Math.random() * 100);
        obj.timestamp = "2018-01-25TZ00:00:00:00";
        data.push(obj);
    }



    
    
      //{"user_id" : 123, "movie_id" : 1234, "algorithmId" : 1, "action" : "complete", "x" : 2, "y" : -5, "timestamp" : "2018-01-25TZ00:00:00:00" }
}

const saveUserData = () => {
  user_actions.collection.insert(data, (err, response) => {
      if (err) {
          console.log('error inserting data into DB', err);
      } else {
          console.log('successful entry into db';
      }
  })
}

const saveUserListData = () => {
    user_lists.collection.insert(data, (err, response) => {
        if (err) {
            console.log('error inserting data into DB', err);
        } else {
            console.log('successful entry into db';
        }
    })
}

const saveGlobalListData = () => {
    global_list.collection.insert(data, (err, response) => {
        if (err) {
            console.log('error inserting data into DB', err);
        } else {
            console.log('successful entry into db';
        }
    })
}



module.exports = {
    testFunction,
    userDataGenerator
}