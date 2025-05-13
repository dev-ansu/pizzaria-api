import prismaclient from "../../prisma";

interface SendOrderRequest{
    order_id: string;
}

class SendOrderService{
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
                draft: false,
            },
            where:{
                id: order_id,
            }
        });
       
        return {error: false, order};
    }
}

export default new SendOrderService;