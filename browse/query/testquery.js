const db = require('../database')

// imported getUserRecs 
// const getUserRecs = (userId, cb) => {
//     UserRecIds.find({user_id: userId}).exec((err, results) => {
//         if (err) {
//             cb(err);
//         } else {
//             cb(null, results);
//         }
//     })
// }

const testQuery = (id) => {
    let now = Date.now();

    db.getUserRecs(id, (err, results) => {
        if (err) {
          console.log('getUserRecs failed', err)
        } else {
            console.log(results)
            console.log(Date.now() - now);
        }
    })
};

//find user_id 64351
testQuery(64351);