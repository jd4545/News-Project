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
        test("status 400, responds with Invalid id entered",()=>{
            return request(app).get('/api/articles/Bad-id')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Invalid id entered")
            })
        })
        test("status 404, valid id format entered but no such article",()=>{
            return request(app).get('/api/articles/75464534')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toEqual("Article not found")
            })
        })
    });
})