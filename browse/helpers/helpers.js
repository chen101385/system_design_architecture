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

module.exports = {
    testFunction,
    saveUserActionData,
    saveUserListData,
    saveGlobalListData
}