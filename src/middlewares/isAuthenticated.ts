import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaclient from "../prisma";

interface Payload{
    sub: string;
}

export async function isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void>{
    // Receber o token
    const authToken = req.headers.authorization;

    if(!authToken) {res.status(401).end(); return;};

    const [, token] = authToken.split(" ")
    
    try{

        // Validar o token
        const JWT_SECRET = process.env.JWT_SECRET;
        const { sub } = verify(token, JWT_SECRET) as Payload;
        
        // Recuperar o id do token e colocar dentro de uma variável user_id dentro do Request.
        req.user_id = sub;

        // const userExists = await prismaclient.user.findUnique({
        //     where:{
        //         id: sub,
        //     }
        // })

        // if(!userExists){
        //     res.status(401).end();
        //     return;
        // }

        next();
        return
    }catch(err){
        res.status(401).end();
        return;
    }

}