import { Request, Response } from "express";
import AuthService from "../../services/auth/AuthService";

class AuthController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body;

        const auth = await AuthService.execute({ email, password });
        
        res.json(auth);
        return;
    }
}

export default new AuthController