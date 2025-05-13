import { Request, Response } from "express";
import ListCategoryService from "../../services/categories/ListCategoryService";

class ListCategoryController{

    async handle(req: Request, res: Response){
        const categories = await ListCategoryService.execute();
        res.json(categories);
        return;
    }

}

export default new ListCategoryController;