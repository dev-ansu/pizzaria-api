import { Request, Response } from "express";
import AddItemService from "../../services/order/AddItemService";

class AddItemController{
    async handle(req: Request, res: Response){ 
        const {amount, order_id, product_id} = req.body;
        const orderItem = await AddItemService.execute({amount, order_id, product_id});
        res.json(orderItem)
        return;        
    }
}

export default new AddItemController;