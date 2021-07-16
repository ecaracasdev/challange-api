"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Responses {
    constructor() {
    }
    success(req, res, data, message, status) {
        res.status(status).send({
            status,
            message,
            body: data
        });
    }
    error(req, res, message, status) {
        res.status(status).send({
            status,
            error: message,
            body: ''
        });
    }
}
const responses = new Responses;
exports.default = responses;
