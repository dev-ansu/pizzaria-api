import { body } from "express-validator";

export const UserValidation = [
    body('name').trim().escape().isString().isLength({ min: 1}).withMessage("O campo nome é obrigatório"),
    body("email").normalizeEmail().isString().isEmail().withMessage("Digite um e-mail válido."),
    body("password").trim().escape().isString().isLength({ min: 6}).withMessage("A senha deve ter no mínimo seis caracteres.").custom((value)=>{
        
        if(!/[A-Z]/.test(value)) throw new Error("A senha deve conter pelo menos uma letra maiúscula.");
        if(!/[a-z]/.test(value)) throw new Error("A senha deve conter pelo menos uma letra minúscula.");
        if(!/[0-9]/.test(value)) throw new Error("A senha deve conter pelo menos um número.");
        if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)) throw new Error('A senha deve conter pelo menos um caractere especial.');
        
        return true; // Senha válida
        
    })
]