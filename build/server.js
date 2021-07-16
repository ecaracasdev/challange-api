"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const sonRoutes_1 = __importDefault(require("./routes/sonRoutes"));
const auth_1 = __importDefault(require("./routes/auth"));
const database_1 = __importDefault(require("./database"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        dotenv_1.default.config();
        database_1.default(process.env.MONGO_URI || 'mongodb://localhost/challangeapi');
        this.app.set('port', process.env.PORT || 3000);
        //middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use('/api/auth', auth_1.default);
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/sons', sonRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
