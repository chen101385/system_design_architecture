const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/test');

const userMovieListSchema = mongoose.Schema({
    user_id: Number,
    algo_id: Number,
    movie_list:  [{
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

const globalMovieListSchema = mongoose.Schema({
    algo_id: Number,
    movie_list:  [{
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
//user recs model;
const UserRecs = mongoose.model('user movie recs', userMovieListSchema);
//global recs model;
const GlobalRecs = mongoose.model('global movie recs', globalMovieListSchema);

const getUserRecs = (cb) => {
    UserRecs.find().exec((err, results) => {
        if (err) {
            cb(err);
        } else {
            cb(null, results);
        }
    })
}

const saveUserRecs = (list, callback) => {
  
    let newList = new UserRecs(list);
    
        newList.save((err, list) => {
            if (err) {
                console.log(err);
            } else {
                callback(null, list);
            }
        })
    }

const getGlobalRecs = (cb) => {
    GlobalRecs.find().exec((err, results) => {
        if (err) {
            cb(err);
        } else {
            cb(null, results);
        }
    })
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


module.exports = {
    getUserRecs,
    getGlobalRecs,
    saveUserRecs,
    saveGlobalRecs
}