"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFinishValidation = void 0;
const express_validator_1 = require("express-validator");
exports.OrderFinishValidation = [
    (0, express_validator_1.body)("order_id").trim().escape().isString().isLength({ min: 1 }).withMessage("O id da ordem é obrigatório.")
];
