const Workout = require("../models/Workout");
const mongoose = require("mongoose")
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }
  try {
    const workout = await Workout.findById(id);
    res.stats(200).json(workout);
  } catch (error) {
    res.stats(400).json({ error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, sets, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, sets, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
};
