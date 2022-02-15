const db = require('./db/connection')

exports.fetchTopics = () =>{
    return db.query(`
    SELECT slug, description FROM topics;
    `).then((results)=>{
        return results.rows
    })
};

exports.fetchArticleByID = (park_id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [park_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found"})
        }
        return rows[0];
    })
};

exports.updateArticleById = (article_id, articleInfo) => {
    return db.query(`SELECT votes FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found"})
        } else {
        updatedVotes = rows[0].votes + articleInfo.inc_votes;
        return db.query(`UPDATE articles
        SET votes = $2 
        WHERE article_id = $1;`, [article_id, updatedVotes])
        .then(({results}) => {
            return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
            .then(({rows}) => {
                return rows[0];
            })
        })
    }
    })
};