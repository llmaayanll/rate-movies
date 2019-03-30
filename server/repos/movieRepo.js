const mongoose = require('mongoose');
const { Movie, MovieReview } = require('../models/movie');

async function getMovieById(movieId) {
    if (mongoose.Types.ObjectId.isValid(movieId)) {
        return await Movie.findById(movieId);
    }
}

async function getAllMovies() {
    return Movie.find({}).select('-__v');
}

async function createNewMovie(movie) {
    const newMovie = new Movie({ ...movie, ratings: {} });
    await newMovie.save();
    return newMovie;
}

async function updateMovie({ movieId, name }) {
    return await Movie.findByIdAndUpdate(movieId, { name });
}

async function deleteMovie(movieId) {
    return await Movie.findByIdAndRemove(movieId);
}

async function postReview(data, movieId) {
    const newReview = new MovieReview({
        ...data
    });
    const currentMovie = await getMovieById(movieId);
    currentMovie.reviews.push(newReview);
    await currentMovie.save();
    await updateRatings(data, movieId);
    await updateFmScore(data, movieId);
    return await currentMovie;
}

async function updateRatings(data, movieId) {
    const currentMovie = await getMovieById(movieId);
    const { bechdelTest } = data.reviewerQuestions;
    const bechdel = bechdelTest ? 5 : 0;
    const newReview = { ...data.reviewerRating, bechdelTest: bechdel };
    Object.keys(newReview).map(key => {
        const currentRating = currentMovie.ratings[key];
        const oldAvg = parseFloat(currentRating.avg);
        const count = currentRating.count;
        currentMovie.ratings[key].avg =
            (oldAvg * count + parseFloat(newReview[key])) / (count + 1);
        currentMovie.ratings[key].count++;
    });
    await currentMovie.save();
}

async function updateFmScore(data, movieId) {
    const currentMovie = await getMovieById(movieId);
    const ratings = currentMovie.ratings;
    //best case all ratings are fulfilled, need to adjust when the ratings are empty
    currentMovie.fmScore =
        (2 * ratings.femaleLead.avg +
            2 * ratings.bechdelTest.avg +
            currentMovie.ratings.LGBTQ.avg +
            ratings.minorityRepresentation.avg -
            ratings.sexualityRate.avg) /
        5;
    await currentMovie.save();
}

async function getMovieRating(movieId) {
    const currentMovie = await getMovieById(movieId);
    return await currentMovie.ratings;
}

module.exports = {
    getMovieById,
    getAllMovies,
    createNewMovie,
    updateMovie,
    deleteMovie,
    postReview,
    getMovieRating
};
