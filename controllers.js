const {fetchTopics, fetchArticleByID, updateArticleById, fetchUsers, 
    fetchArticles, fetchComments, checkArticleExists, createComment, 
    removeComment }
     = require('./models')

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
    const sortBy = req.query.sort_by;
    const order = req.query.order;
    const topic = req.query.topic;

    fetchArticles(sortBy, order, topic)
    .then((articles)=>{
        res.status(200).send({articles});
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
    const { article_id } = req.params;
Promise.all([fetchComments(article_id), checkArticleExists(article_id)])
    .then((commentsPlus)=>{
        const comments = commentsPlus[0];
        res.status(200).send({comments});
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    const commentInfo = req.body;
    createComment(article_id, commentInfo).then((comment) => {
      res.status(201).send({comment})
    })
    .catch(next);
}

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    removeComment(comment_id).then((deleted) => {
      res.status(204).send({deleted});
    })
    .catch(next);
  };