const { connectToDB } = require('../connectToDB');

async function initDB() {
    const db = await connectToDB();
    const movies = await db.collection('movies');
    await movies.deleteMany({});
    await movies.insertMany([
        { id: '1', name: 'harry potter' },
        { id: '2', name: 'hannibal' },
        { id: '3', name: 'pretty woman' }
    ]);
}

async function getMovieById(movieId) {
    const db = await connectToDB();
    const movies = await db.collection('movies');

    const ObjectId = require('mongodb').ObjectId;
    if (ObjectId.isValid(movieId)) {
        const movie = await movies.findOne({ _id: new ObjectId(movieId) });
        return movie;
    } else {
        return null;
    }
}

module.exports = { getMovieById, initDB };
