const fs = require('fs'),
    createCsvWriter = require('csv-writer').createObjectCsvWriter,
    faker = require('faker');

//node --max-old-space-size=8000 browse/helpers/dummyList.js

const userMovieListGenerator = async () => {

    for (let i = 0; i < 100; i++) {
        let fileNum = i;

        let csvWriter = createCsvWriter({
            path: __dirname + `/../data/movieData/dummyUserMovieList${fileNum}.csv`,
            header: [{ id: 'user_id', title: 'user_id' }, { id: 'movie_list', title: 'movie_list' }, { id: 'algo_id', title: 'algo_id' }]
        });

        //added headers
        //, { id: 'Movie_id', title: 'Movie_id' }, { id: 'Title', title: 'Title' }, { id: 'Category', title: 'Category' }, { id: 'Description', title: 'Description' }, { id: 'Length', title: 'Length' }, { id: 'Year', title: 'Year' }, { id: 'Director', title: 'Director' }, { id: 'Key_actors', title: 'Key_actors' }, { id: 'Critical_acclaim', title: 'Critical_acclaim' }, { id: 'Language', title: 'Language' }, { id: 'Thumbnail', title: 'Thumbnail'}

        let records = [];

        for (let j = 0; j <= 1000; j++) {

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
            obj.movie_list = JSON.stringify(movieArray);
            obj.algo_id = Math.floor(Math.random() * 2);
 
            records[j] = obj;
        }
        csvWriter.writeRecords(records)
    }
}

// //in try-catch block, no data passed into next .then; job completed.
try {
    userMovieListGenerator().then(() => {
        console.log('data was successfully written to csv file')
    })
} catch (err) {
    console.log(err);
}

// console.log(faker.name.firstName());