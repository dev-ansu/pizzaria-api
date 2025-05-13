"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorsHandler;
function errorsHandler(err, req, res, next) {
    if (err instanceof Error) {
        res.status(400).json({
            error: true,
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        error: true,
        message: "Erro interno do servidor."
    });
    return;
}
