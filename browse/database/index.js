const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


mongoose.connect('mongodb://54.191.69.185:8080/browse');

const userMovieListSchema = mongoose.Schema({
    user_id: Number,
    algo_id: Number,
    movie_list:  
[{
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

const UserRecs = mongoose.model('userRecs', userMovieListSchema),
    UserRecIds = mongoose.model('userRecIds', userMovieIdListSchema),
    GlobalRecs = mongoose.model('globalRecs', globalMovieListSchema),
    UserInteraction = mongoose.model('userInteractions', userInteractionSchema);

const sendUserBatch = (cb) => {
    UserInteraction.find().sort().limit(100).exec(cb);
}

//empty exec() @ end returns a promise;
const getUserRecs = (userId, cb) => {
    return UserRecIds.find({ user_id: userId }).limit(1).exec();
}

const saveUserRecs = (list) => {
    let newUserList = new UserRecs(list);
    //returns a promise;
    return newUserList.save().exec();
}

module.exports = {
    getUserRecs,
    // getGlobalRecs,
    saveUserRecs,
    // saveGlobalRecs,
    sendUserBatch
}




//CLEAR DB CODE
// UserRecs.find().remove().exec()

//UNUSED FUNCTIONS 

// const saveUserRecs = (list) => {
//     let newUserList = new UserRecs(list);

//     return newUserList.save().exec()
// }

// const getGlobalRecs = (cb) => {
//     //return a promise;
//     return GlobalRecs.find().exec();
// }

// const saveGlobalRecs = (list, callback) => {

//     let newList = new GlobalRecs(list);

//     newList.save((err, list) => {
//         if (err) {
//             console.log(err);
//         } else {
//             callback(null, list);
//         }
//     })
// }