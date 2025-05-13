import { body } from "express-validator";

export const AuthValidation = [
    body("email").normalizeEmail().isString().isEmail().withMessage("Digite um e-mail válido."),
    body("password").trim().escape().isString().isLength({ min: 1}).withMessage("A senha é obrigatória.")
]