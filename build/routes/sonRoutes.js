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
const express_1 = require("express");
const sons_1 = __importDefault(require("../models/sons"));
const user_1 = __importDefault(require("../models/user"));
const responses_1 = __importDefault(require("../network/responses"));
class SonRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getSons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sons = yield sons_1.default.find();
            responses_1.default.success(req, res, sons, 'List of sons', 200);
        });
    }
    getSon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni } = req.params;
            const son = yield sons_1.default.findOne({ dni });
            responses_1.default.success(req, res, son, 'Son found', 200);
        });
    }
    createSon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, dni, email, password, username } = req.body;
            const newSon = new sons_1.default({ firstName, lastName, dni });
            yield newSon.save();
            const newUser = new user_1.default({
                firstName,
                lastName,
                dni,
                email,
                password,
                username
            });
            yield newUser;
            const data = { "newSon": newSon, "newUser": newUser };
            responses_1.default.success(req, res, data, 'Son Created and registered as User', 201);
        });
    }
    updateSon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni } = req.params;
            const son = yield sons_1.default.findOneAndUpdate({ dni }, req.body, { new: true });
            responses_1.default.success(req, res, son, 'Son Updated', 201);
        });
    }
    deleteSon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const son = yield sons_1.default.findOneAndDelete({ url });
            responses_1.default.success(req, res, son.firstName, 'Son Deleted', 200);
        });
    }
    routes() {
        this.router.get('/', this.getSons);
        this.router.get('/:dni', this.getSon);
        this.router.post('/', this.createSon);
        this.router.put('/:dni', this.updateSon);
        this.router.delete('/:dni', this.deleteSon);
    }
}
const sonRoutes = new SonRoutes;
exports.default = sonRoutes.router;
