import { param } from "express-validator";

export const ListByCategoryValidation = [
        param("category_id").trim().escape().isString().isLength({ min: 1}).withMessage("A categoria é obrigatória.")
]