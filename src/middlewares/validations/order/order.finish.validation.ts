import { body } from "express-validator";

export const OrderFinishValidation = [
    body("order_id").trim().escape().isString().isLength({min: 1}).withMessage("O id da ordem é obrigatório.")
]