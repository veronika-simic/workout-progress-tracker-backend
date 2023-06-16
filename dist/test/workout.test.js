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
let token = "";
let id = "";
require("dotenv").config();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const randomNumber = Math.random();
    const createUser = yield request(app)
        .post("/api/user/signup")
        .send({
        email: "jane" + randomNumber + "@doe.com",
        password: "abcABC123!",
    });
    token = createUser.body.token;
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(process.env.MONGO_URI);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.close();
}));
describe("GET /api/workouts", () => {
    it("should return all workouts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get("/api/workouts")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
describe("POST /api/workouts", () => {
    it("should create workout", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
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
    }));
});
describe("GET /api/workouts/" + id, () => {
    it("should return workout by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get("/api/workouts/" + id)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Chest press");
    }));
});
describe("DELETE /api/workouts/:id", () => {
    it("should delete workout by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteResponse = yield request(app)
            .delete("/api/workouts/" + id)
            .set("Authorization", `Bearer ${token}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.title).toBe("Chest press");
    }));
});
