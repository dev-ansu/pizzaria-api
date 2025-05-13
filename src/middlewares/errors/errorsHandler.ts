import { NextFunction, Request, Response } from "express"

export default function errorsHandler(err: Error, req: Request, res: Response, next: NextFunction): void{
    if(err instanceof Error){
         res.status(400).json({
            error: true,
            message: err.message,
        });
        return
    }
     res.status(500).json({
        error: true,
        message: "Erro interno do servidor."
    })
    return;
}