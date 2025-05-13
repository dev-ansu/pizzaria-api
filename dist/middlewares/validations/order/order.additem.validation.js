"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderAddItemValidation = void 0;
const express_validator_1 = require("express-validator");
exports.OrderAddItemValidation = [
    (0, express_validator_1.body)("order_id").trim().escape().isString().isLength({ min: 1 }).withMessage("É necessário referenciar um pedido para adicionar um item."),
    (0, express_validator_1.body)("product_id").trim().escape().isString().isLength({ min: 1 }).withMessage("É necessário escolher um produto para adicionar um item."),
    (0, express_validator_1.body)("amount").trim().escape().isInt({ gt: 0 }).withMessage("A quantidade deve ser um número inteiro positivo.").toInt(),
];
