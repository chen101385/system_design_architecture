const uuid = require('uuid-v4');

const userIdMin = 1;
const userIdMax = 20001;
const movieIdMin = 1;
const movieIdMax = 5001;
const axisMin = -10;
const axisMax = 11;
const currentTime = 1517542331000
const threeMonths = 1509593531000;


const getId = () => {
    return uuid();
}

const getUserId = () => {
    let idNumber = Math.floor(Math.random() * userIdMax);

    if (idNumber < userIdMin) {
        idNumber = userIdMin;
    }

    return idNumber;
};

const getMovieId = () => {
    let idNumber = Math.floor(Math.random() * movieIdMax);

    if (idNumber < movieIdMin) {
        idNumber = movieIdMin;
    }

    return idNumber;
};

const getAlgorithmId = () => {
    let randomNumber = Math.random();

    if (randomNumber > 0.5) {
        return 2;
    } else {
        return 1;
    }
};

const getAction = () => {
    let randomNumber = Math.random();

    if (randomNumber < 0.45) {
        return "impression";
    } else if (randomNumber < 0.6) {
        return "engage";
    } else if (randomNumber < 0.7) {
        return "start";
    } else if (randomNumber < 0.78) {
        return "pause";
    } else if (randomNumber < 0.85) {
        return "complete";
    } else if (randomNumber < 0.9) {
        return "resume";
    } else if (randomNumber < 0.95) {
        return "up";
    } else if (randomNumber < 1) {
        return "down";
    }
};

const getX = () => {
    let xIsPositiveOrNegative = Math.random();

    if (xIsPositiveOrNegative > 0.5) {
        return Math.floor(Math.random() * axisMax);
    } else {
        return Math.floor(Math.random() * axisMin);
    };

};

const getY = () => {
    let yIsPositiveOrNegative = Math.random();

    if (yIsPositiveOrNegative > 0.5) {
        return Math.floor(Math.random() * axisMax);
    } else {
        return Math.floor(Math.random() * axisMin);
    };
};

const getTimestamp = () => {
  return currentTime + Math.round(Math.random() * threeMonths);
}


module.exports = {getId, getUserId, getMovieId, getAlgorithmId, getAction, getX, getY, getTimestamp};