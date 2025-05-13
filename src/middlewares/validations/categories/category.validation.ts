import { body } from "express-validator";

export const CategoryValidation = [
    body("name").trim().escape().toUpperCase().isString().isLength({ min: 1}).withMessage("O nome da categoria é obrigatório.")
]