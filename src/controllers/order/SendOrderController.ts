import { Request, Response } from "express";
import SendOrderService from "../../services/order/SendOrderService";

class SendOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.params;
       
        const order = await SendOrderService.execute({order_id})
        
        res.json(order);

        return;
    }
}

export default new SendOrderController