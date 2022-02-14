const {fetchTopics} = require('./models')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics)=>{
        res.status(200).send({topics});
    }).catch((err)=>{console.log(err)})
};
