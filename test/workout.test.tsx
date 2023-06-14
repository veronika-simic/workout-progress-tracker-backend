import { Workout } from "../../client/src/types/workoutState";

export {};
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const res = await request(app).get("/api/workouts");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/workouts/:id", () => {
  it("should return workout by id", async () => {
    const res = await request(app).get(
      "/api/workouts/64898b7596319c5ca5a2ce8d"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Chest press");
  });
});

describe("POST /api/workouts", () => {
  it("should create workout", async () => {
    const res = await request(app).post("/api/workouts").send({
      title: "Chest press",
      sets: 4,
      reps: 8,
      load: 40,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Chest press");
  });
});

/* describe("DELETE /api/workouts/:id", () => {
  let workoutToBeDeletedId: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/workouts").send({
      title: "Chest press",
      sets: 4,
      reps: 8,
      load: 40,
    });
    workoutToBeDeletedId = res.body._id;
  });

  afterAll(async () => {
    await request(app).delete(`/api/workouts/${workoutToBeDeletedId}`);
  });
  it("should delete workout by id", async () => {
    const res = await request(app).delete(
      `/api/workouts/${workoutToBeDeletedId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.sets).toBe(4);
  });
}); */

describe("PATCH /api/workouts/:id", () => {
  it("should update workout by id", async () => {
    const res = await request(app)
      .patch("/api/workouts/64898b7596319c5ca5a2ce8d")
      .send({
        title: "Chest press",
        sets: 8,
        reps: 8,
        load: 40,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.sets).toBe(8);
  });
});
