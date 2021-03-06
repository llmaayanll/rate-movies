const mongoose = require('mongoose');

module.exports = function() {
    mongoose
        .connect('mongodb://localhost/rate-movies', {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => console.log('connected to mongo db'))
        .catch(err => console.error('could not connect to mongo db', err));

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(
                'Mongoose default connection is disconnected due to application termination'
            );
            process.exit(0);
        });
    });
};
