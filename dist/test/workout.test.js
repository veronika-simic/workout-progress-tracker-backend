"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
require("dotenv").config();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(process.env.MONGO_URI);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.close();
}));
describe("GET /api/workouts", () => {
    it("should return all workouts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get("/api/workouts");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
});
describe("GET /api/workouts/:id", () => {
    it("should return workout by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get("/api/workouts/64898b7596319c5ca5a2ce8d");
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Chest press");
    }));
});
describe("POST /api/workouts", () => {
    it("should create workout", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).post("/api/workouts").send({
            title: "Chest press",
            sets: 4,
            reps: 8,
            load: 40,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Chest press");
    }));
});
describe("DELETE /api/workouts/:id", () => {
    it("should delete workout by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield request(app).post("/api/workouts").send({
            title: "Chest press",
            sets: 4,
            reps: 8,
            load: 40,
        });
        const workoutId = createResponse.body._id;
        const deleteResponse = yield request(app).delete(`/api/workouts/${workoutId}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.title).toBe("Chest press");
    }));
});
describe("PATCH /api/workouts/:id", () => {
    it("should update workout by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .patch("/api/workouts/64898b7596319c5ca5a2ce8d")
            .send({
            title: "Chest press",
            sets: 8,
            reps: 8,
            load: 40,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.sets).toBe(8);
    }));
});
