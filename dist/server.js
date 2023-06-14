"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutsRoutes");
const userRoutes = require("./routes/userRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'REST API for Swagger Documentation',
            description: "This is a Workout Progresss Tracker App Swagger. For this sample, you can use the `token` , which is returned after successful sign up or login, for authorization",
            version: "1.0.0",
            contact: { email: "veronikaisles@gmail.com" },
            license: {
                name: "Apache 2.0",
                url: "http://www.apache.org/licenses/LICENSE-2.0.html",
            },
            externalDocs: {
                description: "Find out more about Swagger",
                url: "http://swagger.io",
            },
            tags: [
                { name: "Workouts", description: "Operations about workouts" },
                { name: "User", description: "Operations about user" },
            ],
        },
        schemes: ["http", "https"],
        servers: [{ url: "http://localhost:4000/" }]
    },
    apis: [
        "./src/routes/workoutsRoutes.ts",
        "./src/routes/userRoutes.ts",
    ]
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
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
        });
    }
})
    .catch((error) => {
    console.log(error);
});
module.exports = app;
