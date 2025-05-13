"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRemoveItemValidation = void 0;
const express_validator_1 = require("express-validator");
exports.OrderRemoveItemValidation = [
    (0, express_validator_1.param)("item_id").trim().escape().isString().isLength({ min: 1 }).withMessage("É necessário referenciar um pedido para adicionar um item."),
];
