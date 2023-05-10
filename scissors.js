'use strict';

const express = require('express');
var cors = require('cors')
const session = require('express-session');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const http = require('http')
const bodyParser = require('body-parser');

/** get the base path, then add it as a global variable. */
global.__basedir = require('path').resolve('./');

/** parse the dot env and get the port */
require('dotenv').config({ path: __basedir + '/env/.env' })
const { PORT, ALLOWED_ORIGIN, SESSION_SECRET, DOMAIN } = process.env;

const errorHandler = require(__basedir + '/utils/ErrorHandler')
global.mongoose = require(__basedir + '/utils/database.config');

const app = express();

/**parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))

/**parse requests of content-type - application/json*/
app.use(bodyParser.json())

/** serving public file , the cookie parser and show the bot page */
app.use(express.static('views'));

var whitelist = ["http://localhost:3000", "http://localhost:2000"]
var corsOptions = {
    origin: whitelist,
    credentials: true,
};

app.options(cors(corsOptions));
app.use(cors(corsOptions));

//sessions is here 
app.use(helmet());


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:urlID', async (req, res) => {
    res.end()
});

/** Standard error handling */
app.use(errorHandler)

/** catch all routes that are not defined and send response */
app.get('*', (req, res) => {
    res.status(404).json({
        "status": "error",
        "message": "Not Found",
        "data": null
    });
    res.end()
});

/* Connect express app server  */
const server = http.createServer(app)

/**listen for requests */
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});