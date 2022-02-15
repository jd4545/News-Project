const express = require('express');
const {handleInvalidEndpoint, handlePSQL, handleCustomErrors, handle500} = require('./error.controllers');
const {getTopics, getArticleById} = require('./controllers');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

//========ERRORS:==========

app.all("/*", handleInvalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePSQL);
app.use(handle500);

module.exports = app;