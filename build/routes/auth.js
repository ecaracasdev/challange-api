"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const verifyToken_1 = require("../libs/verifyToken");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/signup', auth_controller_1.default.signup);
        this.router.post('/login', auth_controller_1.default.login);
        this.router.get('/profile', verifyToken_1.tokenValidation, auth_controller_1.default.profile);
    }
}
const authRoutes = new AuthRoutes();
authRoutes.routes();
exports.default = authRoutes.router;
