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
const Workout = require("../models/Workout");
const mongoose = require("mongoose");
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workouts = yield Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
});
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = yield Workout.findById(id);
    if (!workout) {
        res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
});
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, sets, reps, load } = req.body;
    let emptyFields = [];
    if (!title) {
        emptyFields.push("title");
    }
    if (!sets) {
        emptyFields.push("sets");
    }
    if (!reps) {
        emptyFields.push("reps");
    }
    if (!load) {
        emptyFields.push("load");
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all the fields", emptyFields });
    }
    try {
        const workout = yield Workout.create({ title, sets, reps, load });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout" });
    }
    const workout = yield Workout.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
});
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = yield Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
});
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
