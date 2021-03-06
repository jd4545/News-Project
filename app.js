const express = require("express");
const cors = require("cors");
const {
  handleInvalidEndpoint,
  handlePSQL,
  handleCustomErrors,
  handle500,
} = require("./error.controllers");
const {
  getTopics,
  getArticleById,
  patchArticleById,
  getUsers,
  getArticles,
  getComments,
  postComment,
  deleteComment,
  describeEndpoints,
} = require("./controllers");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api", describeEndpoints);

//========ERRORS:==========

app.all("/*", handleInvalidEndpoint);
app.use(handleCustomErrors);
app.use(handlePSQL);
app.use(handle500);

module.exports = app;
