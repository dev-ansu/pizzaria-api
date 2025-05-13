import { body } from "express-validator";

export const OrderAddItemValidation = [
    body("order_id").trim().escape().isString().isLength({min: 1}).withMessage("É necessário referenciar um pedido para adicionar um item."),
    body("product_id").trim().escape().isString().isLength({min: 1}).withMessage("É necessário escolher um produto para adicionar um item."),
    body("amount").trim().escape().isInt({gt: 0}).withMessage("A quantidade deve ser um número inteiro positivo.").toInt(),
]