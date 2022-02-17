const express = require('express');
const {handleInvalidEndpoint, handlePSQL, handleCustomErrors, handle500, handleEmptyEntry} = require('./error.controllers');
const {getTopics, getArticleById, patchArticleById, getUsers, getArticles, getComments} = require('./controllers');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchArticleById);

app.get('/api/users', getUsers);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getComments)

//========ERRORS:==========

app.all("/*", handleInvalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePSQL);
app.use(handleEmptyEntry);
app.use(handle500);

module.exports = app;