import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import fs from 'fs';
import path from 'path';

export const ValidateErrors = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{

    const errors = validationResult(req); // verifica os erros de validação

    if(!errors.isEmpty()){  
        
        if (req.file) {
            fs.unlink(path.resolve(req.file.path), (err) => {
                if (err) console.error("Erro ao deletar arquivo:", err);
            });
        }

        // Se usar múltiplos arquivos:
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
            try {
                await fs.promises.unlink(path.resolve(file.path));
            } catch (err) {
                console.error("Erro ao deletar arquivo:", err);
            }
            }
        }

        res.status(400).json({ errors: errors.array() }); // Retorna erros caso existam
        return;
    }

    next(); // Se não houver errors, passa para o próximo middleware

}