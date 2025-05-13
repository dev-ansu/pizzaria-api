import { param } from "express-validator";

export const OrderDetailValidation = [
    param("order_id").trim().escape().isString().isLength({min: 1}).withMessage("O id da ordem é obrigatório.")
]