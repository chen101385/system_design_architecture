const fs = require('fs'),
    db = require('../database'),
    faker = require('faker');

//node --max-old-space-size=8000 browse/helpers/dummyList.js

const userMovieListGenerator = async () => {

    try {
        let obj = {};
    
        let movieArray = [];
    
        for (let k = 0; k < 50; k++) {
    
            let categories = ['horror', 'action', 'comedy', 'drama', 'animated', 'family', 'romantic comedy', 'sci-fi'];
            let boolean = [true, false]
    
            let movie = {
                Movie_id: Math.floor(Math.random() * 3000),
                Title: faker.lorem.words(),
                Category: categories[Math.floor(Math.random() * 8)],
                Description: faker.lorem.words(),
                Length: "2 hours",
                Year: 2017 - Math.floor(Math.random() * 70),
                Director: faker.name.findName(),
                Key_actors: [faker.name.findName()],
                Critical_acclaim: Math.floor(Math.random() * 2),
                Language: "English",
                Thumbnail: faker.image.imageUrl()
            };
    
            movieArray.push(movie);
        }
    
        obj.user_id = Math.floor(Math.random() * 100000);
        obj.movie_list = movieArray;
        obj.algo_id = Math.floor(Math.random() * 2);
    
        db.saveUserRecs(obj);

    } catch(err) {
        console.log('USER MOVIE LIST GENERATOR FAILED!', err)
    }
}

for (let i = 0; i < 1000; i++) {
    userMovieListGenerator();
}

