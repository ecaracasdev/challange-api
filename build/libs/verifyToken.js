"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const responses_1 = __importDefault(require("../network/responses"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidation = (req, res, next) => {
    let token = req.header('auth-token') || '';
    if (!token)
        responses_1.default.error(req, res, 'Access denied', 400);
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    //declaration merging
    req.userId = payload._id;
    next();
};
exports.tokenValidation = tokenValidation;
