import prismaclient from "../../prisma";

interface SendOrderRequest{
    order_id: string;
}

class FinishOrderService{
    async execute({order_id}: SendOrderRequest){
        let orderFind = await prismaclient.order.findFirst({
            where:{
                id: order_id,
            }
        });
        
        if(!orderFind){
            throw new Error("Este pedido não existe.")
        }

        const order = await prismaclient.order.update({
            data:{
                status: true,
            },
            where:{
                id: order_id,
            }
        });
       
        return order;
    }
}

export default new FinishOrderService;