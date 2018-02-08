const fs = require('fs'),
    createCsvWriter = require('csv-writer').createObjectCsvWriter,
    faker = require('faker');

//node --max-old-space-size=8000 browse/helpers/dummyList.js

const userMovieListGenerator = async () => {

    for (let i = 0; i < 20; i++) {
        let fileNum = i;

        let csvWriter = createCsvWriter({
            path: __dirname + `/../data/movieData/dummyMovieList${fileNum}.csv`,
            header: [{ id: 'user_id', title: 'user_id' }, { id: 'movie_list', title: 'movie_list' }, { id: 'algo_id', title: 'algo_id' }]
        });

        let records = [];

        for (let j = 0; j <= 25000; j++) {

            let obj = {};

            let movieArray = [];
            for (let k = 0; k < 50; k++) {
                let movie = {};
                let categories = ['horror', 'action', 'comedy', 'drama', 'animated', 'family', 'romantic comedy', 'sci-fi'];
                let boolean = [true, false]


                movie.Movie_id = Math.floor(Math.random() * 3000);
                movie.Title = faker.lorem.words();
                movie.Category = categories[Math.floor(Math.random() * 8)];
                movie.Description = faker.lorem.words();
                movie.Length = "2 hours";
                movie.Year = 2017 - Math.floor(Math.random() * 70);
                movie.Director = faker.name.firstName() + faker.name.lastName();
                movie.Key_actors = [faker.lorem.words()];
                movie.Critical_acclaim = Math.floor(Math.random() * 2);
                movie.Language = "English";
                movie.Thumbnail = faker.image.imageUrl();
      

    obj.user_id = Math.floor(Math.random() * 100000);
    obj.movie_list = movie;
        obj.algo_id = Math.floor(Math.random() * 2);

    records[j] = obj;
}
csvWriter.writeRecords(records)
    }
}

//in try-catch block, no data passed into next .then; job completed.
try {
    listDataGenerator().then(() => {
        console.log('data was successfully written to csv file')
    })
} catch (err) {
    console.log(err);
}
