const Workout = require("../models/Workout");
const mongoose = require("mongoose");

import { Request, Response } from "express";

const getWorkouts = async (req: { user: { _id: string; }; }, res: Response) => {
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
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

const createWorkout = async (req: { body: { title:string; sets: number; reps: number; load:number; }; user: { _id: string; }; }, res: Response) => {
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
    const user_id = req.user._id
    const workout = await Workout.create({ title, sets, reps, load, user_id });
    res.status(201).json(workout);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
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
  deleteWorkout,
};
