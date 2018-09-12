const express = require('express');
const bodyParser = require('body-parser');
const logger = require('tracer').colorConsole();
const pool = require('../db/db'); // eslint-disable-line no-unused-vars
const routes = require('../routes/index');

const port = process.env.PORT || 4000;
const testApp = express();

testApp.use(bodyParser.urlencoded({ extended: false }));
testApp.use(bodyParser.json());
testApp.use('/', routes);
testApp.listen(port, () => logger.info(`Server listening on port : ${port}`));
module.exports = testApp;
