import { Request, Response } from "express";
import DetailUserService from "../../services/user/DetailUserService";

class DetailUserController{
    async handle(req: Request, res: Response){
        
        const user_id = req.user_id;

        const user = await DetailUserService.execute(user_id);

        res.json(user);
        return;
    }
}

export default new DetailUserController