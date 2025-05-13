"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterHandler = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiterHandler = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo de 100 requisições por IP a cada 15 min
    standardHeaders: true, // Retorna os headers padrão de rate limit
    legacyHeaders: false, // Desativa os headers `X-RateLimit-*` antigos
    // Só conta se a resposta foi erro (4xx ou 5xx)
    skip: (req, res) => {
        const status = res.statusCode;
        return status < 400; // se for sucesso (menor que 400), não conta
    },
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Você excedeu o número de requisições permitidas. Por favor, tente novamente mais tarde.',
        });
    },
});
