import { Request, Response } from "express";
import FinishOrderService from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.params;
       
        const order = await FinishOrderService.execute({order_id})
        
        res.json(order);

        return;
    }
}

export default new FinishOrderController;