const { BASE_DB_URI, DB_NAME, AUTH_SOURCE } = process.env;

const DB_CONNECTION = `${BASE_DB_URI}/${DB_NAME}${AUTH_SOURCE}`;

const clientOption = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.set("strictQuery", true);
mongoose.connect(DB_CONNECTION, clientOption).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose;