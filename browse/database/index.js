const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/browse');

const userMovieListSchema = mongoose.Schema({
    user_id: Number,
    algo_id: Number,
    movie_list: [{
        Movie_id: Number,
        Title: String,
        Category: String,
        Description: String,
        Length: String,
        Year: Number,
        Director: String,
        Key_actors: [String],
        Critical_acclaim: Boolean,
        Language: String,
        Thumbnail: [Schema.Types.Mixed]
    }]
});

const userMovieIdListSchema = mongoose.Schema({
    user_id: Number,
    algo_id: Number,
    movie_list: String
});

const globalMovieListSchema = mongoose.Schema({
    algo_id: Number,
    movie_list: [{
        Movie_id: Number,
        Title: String,
        Category: String,
        Description: String,
        Length: String,
        Year: Number,
        Director: String,
        Key_actors: [String],
        Critical_acclaim: Boolean,
        Language: String,
        Thumbnail: [Schema.Types.Mixed]
    }]
});

const userInteractionSchema = mongoose.Schema({
    user_id: Number,
    movid_id: Number,
    algo_id: Number,
    action: String,
    x: Number,
    y: Number,
    timestamp: Date
})
//user recs model;
const UserRecs = mongoose.model('userRecs', userMovieListSchema);
const UserRecIds = mongoose.model('userRecIds', userMovieIdListSchema);
//global recs model;
const GlobalRecs = mongoose.model('globalRecs', globalMovieListSchema);

const UserInteraction = mongoose.model('userInteractions', userInteractionSchema);

const sendUserBatch = (cb) => {
    UserInteraction.find().sort().limit(100).exec(cb);
}

//empty exec() @ end returns a promise;
const getUserRecs = (userId, cb) => {
    return UserRecIds.find({ user_id: userId }).limit(1).exec();
}


const saveUserRecs = (list) => {
  //TBD: what is the shape of the list data?
    let newUserList = new UserRecs(list);

    return newList.save().exec()
}

const getGlobalRecs = (cb) => {
    //return a promise;
    return GlobalRecs.find().exec();
}

const saveGlobalRecs = (list, callback) => {

    let newList = new GlobalRecs(list);

    newList.save((err, list) => {
        if (err) {
            console.log(err);
        } else {
            callback(null, list);
        }
    })
}

//CLEAR DB CODE
// UserRecs.find().remove().exec()

// getUserRecs(10, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// })


module.exports = {
    getUserRecs,
    getGlobalRecs,
    saveUserRecs,
    saveGlobalRecs,
    sendUserBatch
}