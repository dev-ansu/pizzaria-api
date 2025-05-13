"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const express_validator_1 = require("express-validator");
exports.AuthValidation = [
    (0, express_validator_1.body)("email").normalizeEmail().isString().isEmail().withMessage("Digite um e-mail válido."),
    (0, express_validator_1.body)("password").trim().escape().isString().isLength({ min: 1 }).withMessage("A senha é obrigatória.")
];
