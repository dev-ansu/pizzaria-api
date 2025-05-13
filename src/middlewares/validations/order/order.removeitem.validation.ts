import { param } from "express-validator";

export const OrderRemoveItemValidation = [
    param("item_id").trim().escape().isString().isLength({min: 1}).withMessage("É necessário referenciar um pedido para adicionar um item."),
]