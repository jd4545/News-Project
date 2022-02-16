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
        return db.query(`UPDATE articles
        SET votes = votes + $2 
        WHERE article_id = $1;`, [article_id, articleInfo.inc_votes])
        .then(({results}) => {
            return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
            .then(({rows}) => {
                if (rows.length === 0) {
                    return Promise.reject({ status: 404, msg: "Article not found"})
                } 
                return rows[0];
            })
        })
};

exports.fetchUsers = () =>{
    return db.query(`
    SELECT username FROM users;
    `).then((results)=>{
        return results.rows
    })
};

exports.fetchArticles = () => {
    return db.query(`
    SELECT author, title, article_id, topic, created_at, votes FROM articles
    ORDER BY created_at DESC;
    `).then((results)=>{
        // console.log(results.rows)
        return results.rows
    })
}

exports.fetchComments = (article_id) => {
    return db.query(`
    SELECT comment_id, votes, created_at, author, body 
    FROM comments 
    WHERE article_id = $1;`, [article_id])
    .then((results)=>{
        if (results.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found"})
        }
        return results.rows
    })
}