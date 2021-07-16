"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = __importDefault(require("../network/responses"));
class Auth {
    constructor() {
    }
    //PARA REGISTAR AL USUARIO
    signup(req, res) {
        const { firstName, lastName, dni, email, password, username } = req.body;
        const data = {
            firstName,
            lastName,
            dni,
            email,
            password,
            username
        };
        console.log(`[auth.controller] Datos usuario: \n`, data);
        responses_1.default.success(req, res, data, 'User registered', 201);
    }
    //para hacer login
    login(req, res) {
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        responses_1.default.success(req, res, data, 'Login success', 200);
    }
}
const auth = new Auth;
exports.default = auth;
