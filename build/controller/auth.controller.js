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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = __importDefault(require("../network/responses"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor() {
    }
    //PARA REGISTAR AL USUARIO
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //saving new user
            const { firstName, lastName, dni, email, password, username } = req.body;
            const user = new user_1.default({
                firstName,
                lastName,
                dni,
                email,
                password,
                username
            });
            user.password = yield user.encryptPassword(user.password);
            const savedUser = yield user.save();
            console.log(`[auth.controller] Datos usuario creado: \n`, savedUser);
            //token
            const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'token_test');
            responses_1.default.sign_success(req, res, savedUser, 'User registered', 201, token);
        });
    }
    //para hacer login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ email: req.body.email });
            if (!user)
                return responses_1.default.error(req, res, 'Email or password are wrong', 400);
            const correctPassword = yield (user === null || user === void 0 ? void 0 : user.validatePassword(req.body.password));
            if (!correctPassword)
                return responses_1.default.error(req, res, 'Invalid password', 400);
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'token_test', {
                expiresIn: 60 * 60 * 24
            });
            responses_1.default.sign_success(req, res, { email: user.email, password: user.password }, 'Login success', 200, token);
        });
    }
}
const auth = new Auth;
exports.default = auth;
