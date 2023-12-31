"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutsRoutes");
const userRoutes = require("./routes/userRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./documentation/swagger");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    if (process.env.NODE_ENV !== "test") {
        app.listen(process.env.PORT, () => {
            console.log("Listening on port " + process.env.PORT);
            V1SwaggerDocs(app, process.env.PORT);
        });
    }
})
    .catch((error) => {
    console.log(error);
});
module.exports = app;
