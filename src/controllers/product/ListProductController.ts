import { Request, Response } from "express";
import ListProductsService from "../../services/product/ListProductsService";

class ListProductController{
    async handle(req: Request, res: Response){
   
        const products = await ListProductsService.execute();

        res.json(products);
        
        return;
    }
}

export default new ListProductController