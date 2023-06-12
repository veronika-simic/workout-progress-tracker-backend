const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutsController")

router.get("/", workoutController.getWorkouts);

router.get("/:id", workoutController.getWorkout);

router.post("/", workoutController.createWorkout);

router.delete("/:id", (req, res) => {
  res.json({ mssg: "Delete workout" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "Update workout" });
});

module.exports = router;
