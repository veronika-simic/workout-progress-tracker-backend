const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutsRoutes");
const userRoutes = require("./routes/userRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./documentation/swagger");
const app = express();

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";


app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
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
  .catch((error: ErrorRequestHandler) => {
    console.log(error);
  });
module.exports = app;
