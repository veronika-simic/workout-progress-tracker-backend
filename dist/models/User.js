"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.statics.signup = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw new Error("All fields must be filled");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Email not valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("Password not valid");
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw new Error("Email already in use");
        }
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        const user = yield this.create({ email, password: hash });
        return user;
    });
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw new Error("Incorrect credentials");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error("Incorrect email");
        }
        const match = yield bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Incorrect password");
        }
        return user;
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
module.exports = User;
