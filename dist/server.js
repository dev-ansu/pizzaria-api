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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const errorsHandler_1 = __importDefault(require("./middlewares/errors/errorsHandler"));
const rateLimiterHandler_1 = require("./middlewares/rateLimiter/rateLimiterHandler");
const path_1 = __importDefault(require("path"));
const detect_port_1 = __importDefault(require("detect-port"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const isDev = process.env.NODE_ENV !== 'production';
const DEFAULT_PORT = parseInt(process.env.DEFAULT_PORT || "3000", 10);
const app = (0, express_1.default)();
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp")));
app.use(rateLimiterHandler_1.rateLimiterHandler);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // no máximo 50MB
}));
app.use(routes_1.router);
app.use(errorsHandler_1.default);
const startServer = (port, defaultPort) => {
    app.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`🚀 Server is running at ${url}`);
        if (defaultPort && port !== DEFAULT_PORT) {
            console.warn(`⚠️ Port ${defaultPort} is in use. Switched to ${port}`);
        }
    });
};
function startDevelopmentServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = yield (0, detect_port_1.default)(DEFAULT_PORT);
        startServer(port, DEFAULT_PORT);
    });
}
function startProductionServer() {
    const port = parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10);
    startServer(port);
}
if (isDev) {
    startDevelopmentServer();
}
else {
    startProductionServer();
}
