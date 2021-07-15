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
class SonRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getSons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sons = yield sons_1.default.find();
            res.json(sons);
        });
    }
    getSon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.url);
            const post = yield Post.findOne({
                url: req.params.url
            });
            res.json({ data: post });
        });
    }
    createSon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const newPost = new Post({ title, url, content, image });
            yield newPost.save();
            res.json({ data: newPost });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield Post.findOneAndUpdate({ url }, req.body, { new: true });
            console.log(req.params.url);
            console.log(req.body);
            res.json({ data: post });
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield Post.findOneAndDelete({ url });
            res.json({ data: `${post.title} was deleted` });
        });
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoutes = new PostRoutes;
exports.default = postRoutes.router;
