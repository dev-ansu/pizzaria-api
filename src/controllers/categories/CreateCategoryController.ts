import { Request, Response } from "express";
import CreateCategoryService from "../../services/categories/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        const body = req.body;
        const category = await CreateCategoryService.execute(body);
        res.json(category)
        return;
    }
}

export default new CreateCategoryController