import { param } from "express-validator";

export const OrderSendValidation = [
    param("order_id").trim().escape().isString().isLength({min: 1}).withMessage("O id da ordem é obrigatório.")
]