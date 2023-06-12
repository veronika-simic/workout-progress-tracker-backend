const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "Get all workouts" });
});
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get single workout" });
});

router.post("/", (req, res) => {
  res.json({ mssg: "Create workout" });
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "Delete workout" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "Update workout" });
});

module.exports = router;
