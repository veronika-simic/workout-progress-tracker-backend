const Workout = require("../models/Workout");
const mongoose = require("mongoose");
import { ErrorRequestHandler, Request, Response } from "express";


const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req: Request, res: Response) => {
  const { title, sets, reps, load } = req.body;
  const workout = await Workout.create({ title, sets, reps, load });
  if (!workout) {
    res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
