"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Tracks_1 = __importDefault(require("./routes/Tracks"));
const Cart_1 = __importDefault(require("./routes/Cart"));
const router = (0, express_1.default)();
/** connect mongo */
mongoose_1.default.set('strictQuery', true);
const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
};
mongoose_1.default
    .connect(config_1.config.mongo.url, options)
    .then(() => {
    Logging_1.default.info('Mongo DB Connected.');
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error('unable to connect.');
    Logging_1.default.error(`Error occured: ${error}`);
});
/** only start the server if Mongo Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging_1.default.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url} - IP: [${req.socket.remoteAddress}]]`);
        res.on('finish', () => {
            /** Log the res */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/tracks', Tracks_1.default);
    router.use('/cart', Cart_1.default);
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        res.status(404).json({
            message: error.message
        });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
