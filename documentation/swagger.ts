const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: 'REST API for Swagger Documentation',
        description: "This is a Workout Progresss Tracker App Swagger. For this sample, you can use the `token` , which is returned after successful sign up or login, for authorization",
        version: "1.0.0",
        contact: {email: "veronikaisles@gmail.com"},
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
      servers: [{url: "http://localhost:4000/"}]
    },
  
    apis: [
      "./routes/workoutsRoutes.ts",
      "./routes/userRoutes.ts",
    ]
  }
  
  const swaggerSpec = swaggerJSDoc(options)
  const swaggerDocs = (app: { use: (arg0: string, arg1: any, arg2: any) => void; get: (arg0: string, arg1: (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void) => void; }, port: any) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api-docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    console.log(
      `Version 1 Docs are available on http://localhost:${port}/api-docs`
    );
  };

  module.exports =  {swaggerDocs} ;