export {};
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
let token = "";
let id = "";
require("dotenv").config();

beforeAll(async () => {
  const randomNumber = Math.random();
  const createUser = await request(app)
    .post("/api/user/signup")
    .send({
      email: "jane" + randomNumber + "@doe.com",
      password: "abcABC123!",
    });
  token = createUser.body.token;
});

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const res = await request(app)
      .get("/api/workouts")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/workouts", () => {
  it("should create workout", async () => {
    const res = await request(app)
      .post("/api/workouts")
      .send({
        title: "Chest press",
        sets: 4,
        reps: 8,
        load: 40,
      })
      .set("Authorization", `Bearer ${token}`);
    id = res.body._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Chest press");
  });
});

describe("GET /api/workouts/" + id, () => {
  it("should return workout by id", async () => {
    const res = await request(app)
      .get("/api/workouts/" + id)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Chest press");
  });
});

describe("DELETE /api/workouts/:id", () => {
  it("should delete workout by id", async () => {
    const deleteResponse = await request(app)
      .delete("/api/workouts/" + id)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.title).toBe("Chest press");
  });
});
