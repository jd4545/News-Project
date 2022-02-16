const {fetchTopics, fetchArticleByID, updateArticleById, fetchUsers, fetchArticles, fetchComments} = require('./models')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics)=>{
        res.status(200).send({topics});
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleByID(article_id).then((article) => {
      res.status(200).send({article});
    })
    .catch(next);
  };

  exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    const articleInfo = req.body;
    updateArticleById(article_id, articleInfo).then((article) => {
      res.status(200).send({article})
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users)=>{
        res.status(200).send({users});
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles)=>{
        res.status(200).send({articles});
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
    const { article_id } = req.params;
    fetchComments(article_id)
    .then((comments)=>{
        res.status(200).send({comments});
    })
    .catch(next);
};