/**
 * @openapi
 * /api/workouts:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     tags:
 *       - Workouts
 *     summary: Gets all workouts
 *     description: Gets all workouts belonging to a user
 *     operationId: getAllWorkouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: "#/components/schemas/Workout"
 *       401:
 *         description: Missing authentication token      
 *       500: 
 *         description: Internal server error
 *   post:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     summary: Add new workout
 *     description: Add new workout
 *     operationId: addWorkout
 *     requestBody: 
 *       description: Create a new workout
 *       content:
 *        application/json:
 *          schema:
 *              $ref: "#/components/schemas/Workout"
 *        application/xml:
 *          schema:
 *              $ref: "#/components/schemas/Workout"
 *        application/x-www-form-urlencoded:
 *          schema:
 *              $ref: "#/components/schemas/Workout"
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Workout"
 *           application/xml:
 *             schema:
 *              $ref: "#/components/schemas/Workout"
 *       405:
 *         description: Invalid input     
 *       500: 
 *         description: Internal server error
 * /api/workouts/{workoutId}:
 *   get:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     summary: Find workout by ID
 *     description: Returns a single workout
 *     operationId: getWorkoutById
 *     parameters: 
 *       -  in: path
 *          name: workoutId
 *          description: ID of workout to return
 *          required: true
 *          schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Workout"
 *       400: 
 *         description: Invalid ID 
 *       401:
 *         description: Missing authentication token
 *       404: 
 *         description: Workout not found          
 *       500: 
 *         description: Internal server error
 *   patch:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     summary: Update existing workout
 *     description: Update existing workout by ID
 *     operationId: updateWorkout
 *     parameters: 
 *       -  in: path
 *          name: workoutId
 *          description: ID of workout to update
 *          required: true
 *          schema: 
 *           type: string
 *     requestBody:
 *       description: Update existing workout
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Workout"
 *         application/xml:
 *           schema:
 *              $ref: "#/components/schemas/Workout"
 *         application/x-www-form-urlencoded:
 *          schema:
 *              $ref: "#/components/schemas/Workout"
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Workout"
 *       400: 
 *         description: Invalid ID 
 *       401:
 *         description: Missing authentication token
 *       404: 
 *         description: Workout not found          
 *       500: 
 *         description: Internal server error 
 *   delete:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     summary: Delete existing workout
 *     description: Delete existing workout by ID
 *     operationId: deleteWorkout
 *     parameters: 
 *       -  in: path
 *          name: workoutId
 *          description: ID of workout to delete
 *          required: true
 *          schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Invalid ID 
 *       401:
 *         description: Missing authentication token
 *       404: 
 *         description: Workout not found          
 *       500: 
 *         description: Internal server error 
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        in: header
 *        name: Authorization
 *        description: Bearer token to access API endpoints
 *        scheme: bearer
 *        bearerFormat: JWT
 *        value: Bearer <JWT token here>
 *   schemas:
 *    Workout:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Bench press
 *         sets:
 *           type: number
 *           example: 2
 *         reps:
 *           type: number
 *           example: 2
 *         load:
 *           type: number
 *           example: 20
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */

export {};

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login)
router.post("/signup", userController.signUp)


module.exports = router;
