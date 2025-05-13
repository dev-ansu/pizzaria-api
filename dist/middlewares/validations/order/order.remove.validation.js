"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRemoveValidation = void 0;
const express_validator_1 = require("express-validator");
exports.OrderRemoveValidation = [
    (0, express_validator_1.param)("order_id").trim().escape().isString().isLength({ min: 1 }).withMessage("O id da ordem é obrigatório.")
];
