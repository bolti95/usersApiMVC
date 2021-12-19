// import request from "supertest"
const app = require('../app');
// const user_controller = require('../controllers/userController');
const request = require("supertest");

// TODO
describe('Check app settings', function () {
//     test('app headings etc')
// })
})

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

describe('POST router handlers', function () {
    test('/POST Signup response', async () => {
        
    })
    test('/POST Login response', async () => {

    })
})

describe('DELETE router handlers', function () {
    test('/DELETE should return a message if deleted', async () => {
        const response = await request(app).get("/api/users/delete/:username"); 
        console.log(response)
        expect(response.statusCode).toBe(200)
        // expect(message.includes("deleted user"))
        // "message": "deleted user izzy10"
    })
})