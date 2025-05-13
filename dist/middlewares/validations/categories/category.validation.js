"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.CategoryValidation = [
    (0, express_validator_1.body)("name").trim().escape().toUpperCase().isString().isLength({ min: 1 }).withMessage("O nome da categoria é obrigatório.")
];
