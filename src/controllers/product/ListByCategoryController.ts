import { Request, Response } from "express";
import ListByCategoryService from "../../services/product/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){
        const { category_id } = req.params;
        
        const products = await ListByCategoryService.execute({category_id});

        res.json(products);
        
        return;
    }
}

export default new ListByCategoryController