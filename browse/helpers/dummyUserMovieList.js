const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//node --max-old-space-size=8000 browse/helpers/dummyList.js

   let movieArray = [[1588, 499, 640, 4, 314, 49, 2552, 896, 1567, 1273, 142, 2683, 1482, 2792, 1003, 2476, 977, 84, 1644, 1136, 422, 1194, 1736, 2011, 1989, 54, 708, 2546, 865, 1778, 2847, 1624, 1615, 1465, 2600, 1868, 584, 2472, 2549, 2801, 1128, 2610, 482, 187, 2605, 922, 1937, 1148, 831, 2871], [247, 318, 888, 2109, 1013, 2567, 2686, 391, 2543, 385, 1806, 203, 2531, 1606, 143, 1714, 1713, 1285, 53, 2112, 2881, 2392, 1829, 1970, 986, 491, 2727, 933, 1009, 733, 330, 2223, 1424, 1096, 1403, 2605, 1321, 713, 2646, 1077, 2947, 1533, 1053, 2730, 1448, 1223, 585, 861, 1931, 2615],[2801, 526, 737, 2508, 1793, 1237, 817, 462, 1717, 1770, 1759, 1969, 1144, 113, 1505, 1219, 2274, 2238, 2455, 2753, 1612, 37, 435, 383, 1220, 1687, 1149, 2414, 1371, 515, 1189, 624, 1030, 2281, 2507, 1731, 2366, 608, 1354, 840, 1886, 528, 2216, 193, 1521, 2740, 1320, 2029, 1381, 512] ];

const listDataGenerator = async () => {

    for (let i = 0; i < 20; i++) {
        let fileNum = i;

        let csvWriter = createCsvWriter({
            path: __dirname + `/../data/movieData/dummydataset${fileNum}.csv`,
            header: [{ id: 'user_id', title: 'user_id' }, { id: 'movie_list', title: 'movie_list' }, { id: 'algo_id', title: 'algo_id' }]
        });

        let records = [];

        for (let j = 0; j <= 50000; j++) {

            let obj = {};

            obj.user_id = Math.floor(Math.random() * 100000);
            obj.movie_list = movieArray[Math.floor(Math.random() * 3)];
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
