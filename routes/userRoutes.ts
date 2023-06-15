/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Logs in the existing user
 *     description: Logs in the existing user with email and password
 *     operationId: loginUser
 *     requestBody:
 *      description: Log in an existing user
 *      content:
 *        application/json:
 *          schema:
 *              $ref: "#/components/schemas/UserLogin"
 *        application/xml:
 *          schema:
 *              $ref: "#/components/schemas/UserLogin"
 *        application/x-www-form-urlencoded:
 *          schema:
 *              $ref: "#/components/schemas/UserLogin"
 *      required: 
 *          true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/User"
 *           application/xml:
 *              schema: 
 *                 $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid credentials
 *       401: 
 *         description:  User does not exist
 *       405: 
 *         description: Validation exception
 * /api/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up user
 *     description: Creates a new user with verified email and password
 *     operationId: signupUser
 *     requestBody: 
 *       description: Create a new user
 *       content:
 *        application/json:
 *          schema:
 *              $ref: "#/components/schemas/UserSignUp"
 *        application/xml:
 *          schema:
 *              $ref: "#/components/schemas/UserSignUp"
 *        application/x-www-form-urlencoded:
 *          schema:
 *              $ref: "#/components/schemas/UserSignUp"
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *           application/xml: 
 *             schema: 
 *                $ref: "#/components/schemas/User"
 *       405: 
 *         description: Invalid input
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: jane@doe.com
 *         password:
 *           type: string
 *           example: abcABC123!
 *     UserSignUp:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: jane@doe.com
 *         password:
 *           type: string
 *           example: abcABC123!
 *         confirmedPassword:
 *           type: string
 *           example: abcABC123!
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: jane@doe.com
 *         token:
 *           type: string
 *           example: abcABC123!
 */
export {};

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login)
router.post("/signup", userController.signUp)


module.exports = router;
