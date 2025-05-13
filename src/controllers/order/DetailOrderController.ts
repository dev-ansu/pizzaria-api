import { Request, Response } from "express";
import DetailOrderService from "../../services/order/DetailOrderService";

class DetailOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.params;
        const orderDetail = await DetailOrderService.execute({order_id});
        
        res.json(orderDetail);

        return;        
    }
}

export default new DetailOrderController;