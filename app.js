const express = require('express');
const {handleInvalidEndpoint} = require('./error.controllers');
const {getTopics} = require('./controllers');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

//========Errors==========

app.all("/*", handleInvalidEndpoint);


module.exports = app;