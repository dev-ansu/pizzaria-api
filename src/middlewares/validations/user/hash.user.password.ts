import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export const HashUserPassowrd = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{

    try{
        const { password } = req.body;
        
        if(!password){
            res.status(400).json({error: "Senha obrigatória."});
            return;
        }

        const saltRounds = 10;
        const passwordWithPepper = password + process.env.PASSWORD_PEPPER_SECRET;
        const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds)

        req.body.password = hashedPassword; // Substitui a senha original pela hasheada
        next();

    }catch(err){
        console.log("Erro ao hashear senha: ", err);
        res.status(500).json({error: "Erro ao processar senha."})
    }

}