import { body } from "express-validator";

export const OrderValidation = [
    body("table").trim().escape().isInt({gt: 0}).withMessage("O número da mesa deve ser um inteiro positivo maior que zero.").toInt(),
    body("name").trim().escape().isString().optional()
]