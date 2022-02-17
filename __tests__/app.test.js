const seed = require('../db/seeds/seed')
const express = require('express')
const app = require('../app')
const data = require('../db/data/test-data')
const db = require('../db/connection')
const request = require('supertest')
const sorted = require('jest-sorted')

afterAll(()=> db.end());

beforeEach(()=>{
    return seed(data)
})

describe("News app",()=>{
    describe("GET api/topics",()=>{
        test("status:200, responds with array of topic objects",()=>{
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body: { topics }}) => {
                expect(topics).toHaveLength(3);
                topics.forEach(topic => {
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String),
                    })
                })
            })
        })
    })
    describe("Error testing", () => {
        test("status 404 error: invalid path entered", () => {
        return request(app)
        .get("/api/bad-endpoint")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("invalid path");
        })
        })
    })

    describe("GET api/articles/:article_id", () => {
        test("status:200, responds with object with expected properties",()=>{
            const article_id = 5;
            return request(app)
            .get(`/api/articles/${article_id}`)
            .expect(200)
            .then(({body}) => {
                const article = body.article;
                expect(article).toEqual(
                    expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number)
                    })
            )
            })
        })
        test("status 400, responds with Bad request",()=>{
            return request(app).get('/api/articles/Bad-id')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad Request")
            })
        })
        test("status 404, valid id format entered but no such article",()=>{
            return request(app).get('/api/articles/75464534')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toEqual("Article not found")
            })
        })
        test("REFACTOR: status:200, responds with comment count",()=>{
            const article_id = 9;
            return request(app)
            .get(`/api/articles/${article_id}`)
            .expect(200)
            .then(({body}) => {
                const article = body.article;
                expect(article.comment_count).toBe("2")
            })
        })
        test("REFACTOR: status:200, second test responds with comment count",()=>{
            const article_id = 2;
            return request(app)
            .get(`/api/articles/${article_id}`)
            .expect(200)
            .then(({body}) => {
                const article = body.article;
                expect(article.comment_count).toBe("0")
            })
        })
    });
    describe('PATCH /api/articles/:article_id', () => {
    test('status:200, check article properties have not changed and votes have increased by 1', () => {
          const articleUpdate = {inc_votes: 1};
          return request(app)
            .patch('/api/articles/3')
            .send(articleUpdate)
            .expect(200)
            .then(({ body }) => {
                const article = body.article;
                expect(article).toEqual(
                    expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: 1
                    })
            )
            })
    });
    test('status:200, check votes have decreased by 100', () => {
        const articleUpdate = {inc_votes: -100};
        return request(app)
            .patch('/api/articles/3')
            .send(articleUpdate)
            .expect(200)
            .then(({ body }) => {
                const article = body.article;
                expect(article).toEqual(
                    expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: -100
                    })
            )
            })
    });
    test('status:200, check votes have decreased by 10 on an article with non-zero votes', () => {
        // article 1 has 100 votes at time of seeding
        const articleUpdate = {inc_votes: -10};
        return request(app)
            .patch('/api/articles/1')
            .send(articleUpdate)
            .expect(200)
            .then(({ body }) => {
                const article = body.article;
                expect(article).toEqual(
                    expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: 90
                    })
            )
            })
    });
    test("status 400, responds with Bad Request",()=>{
        return request(app).patch('/api/articles/Bad-id')
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")
        })
    });
    test("status 404, valid id format entered but no such article",()=>{
        return request(app).patch('/api/articles/9565737')
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toEqual("Article not found")
        })
    })
    test('status:400, incorrect format in req.body', () => {
        const articleUpdate = {inc_votes: "What's up pussycat, Whoaoaoaoh" };
        return request(app)
            .patch('/api/articles/1')
            .send(articleUpdate)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            })
    });
    test('status:400, zero votes in req.body', () => {
        const articleUpdate = {};
        return request(app)
            .patch('/api/articles/1')
            .send(articleUpdate)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("No input detected")
            })
    });
    });
    describe('GET /api/users', () => {
        test("status:200, responds with array of user objects with username",()=>{
            return request(app)
            .get('/api/users')
            .expect(200)
            .then(({body: { users }}) => {
                expect(users).toHaveLength(4);
                users.forEach(user => {
                    expect.objectContaining({
                        username: expect.any(String)
                    })
                })
            })
        })
    })
    describe.only('GET /api/articles', () => {
        test("status:200, responds with array of article objects",()=>{
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                expect(articles).toHaveLength(12);
                articles.forEach(article => {
                    expect.objectContaining({
                        author: expect.any(String), 
                        title: expect.any(String), 
                        article_id: expect.any(Number), 
                        topic: expect.any(String), 
                        created_at: expect.any(String), 
                        votes: expect.any(Number)
                    })
                })
            })
        })
        test("status 200, articles sorted by date descending (i.e. youngest first)",()=>{
            return request(app).get('/api/articles')
            .expect(200)
            .then(({body: {articles}})=>{
                expect(articles).toBeSortedBy("created_at", { descending : true })
            })
        })
        test("REFACTOR: status:200, now also responds with comment count",()=>{
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                expect(articles).toHaveLength(12);
                articles.forEach(article => {
                    expect.objectContaining({
                        comment_count: expect.any(Number)
                    })
                })
            })
        })
        test("REFACTOR: status:200, checks right count assigned to article 1",()=>{
            // filtering on returned array where article id === 1 to ensure
            // correct comment count assigned and sent to client
            return request(app)
            .get(`/api/articles/`)
            .expect(200)
            .then(({body}) => {
                const articles = body.articles;
                const result = articles.filter(article => {
                    return article.article_id === 1
                })
                console.log(result)
                expect(result[0].comment_count).toBe("11")
            })
        })
    })
    describe('GET /api/articles/:article_id/comments', () => {
        test("status:200, responds with array of comment objects",()=>{
            const article_id = 9;
            return request(app)
            .get(`/api/articles/${article_id}/comments`)
            .expect(200)
            .then(({body}) => {
                const comments = body.comments;
                expect(comments).toHaveLength(2);
                comments.forEach(comment => {
                    expect.objectContaining({
                        comment_id: expect.any(String),
                        votes: expect.any(Number),  
                        created_at: expect.any(String), 
                        author: expect.any(String), 
                        body: expect.any(String)
                    })
                })
            })
        })
        test("status:200, responds with empty array for article with no comments",()=>{
            const article_id = 2;
            return request(app)
            .get(`/api/articles/${article_id}/comments`)
            .expect(200)
            .then(({body}) => {
                const comments = body.comments
                expect(comments).toHaveLength(0);
                comments.forEach(comment => {
                    expect.objectContaining({
                        comment_id: expect.any(String),
                        votes: expect.any(Number),  
                        created_at: expect.any(String), 
                        author: expect.any(String), 
                        body: expect.any(String)
                    })
                })
            })
        })
        test("status 400, responds with Bad request",()=>{
            return request(app).get('/api/articles/Bad-id/comments')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad Request")
            })
        })
        test("status 404, valid id format entered but no such article",()=>{
            return request(app).get('/api/articles/75464534/comments')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toEqual("Article not found")
            })
        })
    })
})