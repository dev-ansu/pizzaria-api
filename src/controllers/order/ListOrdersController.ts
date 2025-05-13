import { Request, Response } from "express";
import ListOrderService from "../../services/order/ListOrdersService";


class ListOrdersController{
    async handle(req: Request, res: Response){
   
        const orders = await ListOrderService.execute();

        res.json(orders);
        
        return;
    }
}

export default new ListOrdersController