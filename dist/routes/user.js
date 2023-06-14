"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.post("/login", userController.login);
router.post("/signup", userController.signUp);
module.exports = router;
