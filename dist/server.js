"use strict";
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
const express_fileupload_1 = __importDefault(require("express-fileupload"));
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
app.listen(process.env.DEFAULT_PORT, () => {
    console.log("Server running");
});
// async function startDevelopmentServer() {
//   const port = await detect(DEFAULT_PORT);
//   startServer(port, DEFAULT_PORT);
// }
// function startProductionServer() {
//   const port = parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10);
//   startServer(port);
// }
// if (isDev) {
//   startDevelopmentServer();
// } else {
//   startProductionServer();
// }
