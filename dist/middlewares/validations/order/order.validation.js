"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const express_validator_1 = require("express-validator");
exports.OrderValidation = [
    (0, express_validator_1.body)("table").trim().escape().isInt({ gt: 0 }).withMessage("O número da mesa deve ser um inteiro positivo maior que zero.").toInt(),
    (0, express_validator_1.body)("name").trim().escape().isString().optional()
];
