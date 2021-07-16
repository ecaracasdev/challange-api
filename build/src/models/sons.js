"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SonSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: Date
});
exports.default = mongoose_1.model('Son', SonSchema);
