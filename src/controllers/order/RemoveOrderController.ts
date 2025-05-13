import { Request, Response } from "express";
import RemoveOrderService from "../../services/order/RemoveOrderService";

class RemoveOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.params;
        
        const order = await RemoveOrderService.execute({order_id})
        
        res.json(order);
        return;        
    }
}

export default new RemoveOrderController