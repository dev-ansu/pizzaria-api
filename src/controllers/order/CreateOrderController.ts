import { Request, Response } from "express";
import CreateOrderService from "../../services/order/CreateOrderService";

class CreateOrderController{
    async handle(req: Request, res: Response){
        const {name, table} = req.body;
        
        const order = await CreateOrderService.execute({name, table});

        res.json(order);
        
        return;
        
    }
}

export default new CreateOrderController;