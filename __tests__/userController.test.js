// import request from "supertest"
// const user_controller = require('../controllers/userController');
const supertest = require("supertest");
const usersRouter = require('../routes/users');

describe('Test handlers', function () {
    test('should respond with 200 code', async () => {
        const response = await require(usersRouter).post("/signup").send ({
            username: "username",
            password: "password",
            email: "email@gmail.com",
        })
        expect(response.statusCode).toBe(200)
    })
})