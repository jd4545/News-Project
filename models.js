const db = require('./db/connection')

exports.fetchTopics = () =>{
    return db.query(`
    SELECT slug, description FROM topics;
    `).then((results)=>{
        return results.rows
    })
};

exports.fetchArticleByID = (article_id) => {
    return db.query(`SELECT articles.* , COUNT(comments.article_id) AS comment_count
     FROM articles 
     LEFT JOIN comments 
     ON articles.article_id = comments.article_id 
     WHERE articles.article_id = $1 
     GROUP BY articles.article_id ;`, [article_id])
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
    SELECT articles.author, articles.title, articles.article_id, 
    articles.topic, articles.created_at, articles.votes, 
    COUNT(comments.article_id) AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id 
    ORDER BY created_at DESC;
    `).then((results)=>{
       // console.log(results.rows)
        return results.rows
    })
}

exports.checkArticleExists = (article_id) => {
    return db.query(`
    SELECT * FROM articles WHERE article_id = $1;
    `, [article_id])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found"})
        }
    })
}

exports.fetchComments = (article_id) => {
    return db.query(`
    SELECT comment_id, votes, created_at, author, body 
    FROM comments 
    WHERE article_id = $1;`, [article_id])
    .then((results)=>{
        // console.log(results.rows, "in model")
        return results.rows
    })
}

exports.createComment = (article_id, commentInfo) => {
    if (Object.keys(commentInfo).length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request"})
    } else if (commentInfo.body === "") {
        return Promise.reject({ status: 400, msg: "Bad Request"})
    }

    return db.query(`INSERT INTO comments 
    (author, body, article_id)
    VALUES 
    ($1, $2, $3) RETURNING *;`, 
    [commentInfo.username, commentInfo.body, article_id])
    .then((results) =>{
        // console.log(results.rows)
        return results.rows[0];
    })
};