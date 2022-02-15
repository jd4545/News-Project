const express = require('express');
const {handleInvalidEndpoint, handlePSQL, handleCustomErrors, handle500} = require('./error.controllers');
const {getTopics, getArticleById, patchArticleById} = require('./controllers');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchArticleById);

//========ERRORS:==========

app.all("/*", handleInvalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePSQL);
app.use(handle500);

module.exports = app;