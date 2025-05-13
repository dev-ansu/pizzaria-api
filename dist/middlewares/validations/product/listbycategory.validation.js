"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByCategoryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.ListByCategoryValidation = [
    (0, express_validator_1.param)("category_id").trim().escape().isString().isLength({ min: 1 }).withMessage("A categoria é obrigatória.")
];
