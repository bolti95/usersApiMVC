// import request from "supertest"
const app = require('../app');
const user_controller = require('../controllers/userController');
const request = require("supertest");
// const router = require('../routes/index');
// const router = require('../routes/users');

describe('GET router handlers', function () {
    test('/GET Signup respond with 200 code', async () => {
        const response = await request(app).get("/api/users/signup"); 
        expect(response.statusCode).toBe(200)
    })
    test('/GET Login respond with 200 code', async () => {
        const response = await request(app).get("/api/users/login"); 
        expect(response.statusCode).toBe(200)
    })
    test('/GET Delete respond with 200 code', async () => {
        const response = await request(app).get("/api/users/delete/:username"); 
        expect(response.statusCode).toBe(200)
    })
})