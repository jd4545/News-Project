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
        test("status 200 & responds with array of topic objects",()=>{
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
    describe("404: user error", () => {
        test("server responds with 404 error when invalid path entered", () => {
          return request(app)
          .get("/api/bad-endpoint")
          .expect(404)
          .then(({body}) => {
            expect(body.msg).toBe("invalid path");
          })
        })
      })
})
});