const {fetchTopics, fetchArticleByID, updateArticleById, fetchUsers} = require('./models')

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
    console.log(req.body)
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
    fetchUsers()
    .then((users)=>{
        res.status(200).send({users});
    })
    .catch(next);
};