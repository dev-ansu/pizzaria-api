import { Request, Response } from "express";
import RemoveItemService from "../../services/order/RemoveItemService";

class RemoveItemController{
    async handle(req: Request, res: Response){ 
        const { item_id } = req.params;
        const orderItem = await RemoveItemService.execute({item_id});
        res.json(orderItem)
        return;        
    }
}

export default new RemoveItemController;