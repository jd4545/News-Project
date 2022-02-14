const {fetchTopics, fetchArticleByID} = require('./models')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics)=>{
        res.status(200).send({topics});
    }).catch(next)
};

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleByID(article_id).then((article) => {
      res.status(200).send({article});
    })
    .catch(next)
  };
