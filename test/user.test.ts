export {};
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/user/login", () => {
  it("should log in user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "verapera@gmail.com",
      password: "ABCabc123!",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token.length).toBeGreaterThan(0);
  });
});

describe("POST /api/user/signup", () => {
  it("should sign up user", async () => {
    const randomNumber = Math.random();
    const email = "verapera" + randomNumber + "@gmail.com";
    const res = await request(app).post("/api/user/signup").send({
      email,
      password: "ABCabc123!",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token.length).toBeGreaterThan(0);
  });
});
