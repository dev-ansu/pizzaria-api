import prismaclient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class RemoveOrderService{
    async execute({order_id}: OrderRequest){
        let orderFind = await prismaclient.order.findFirst({
            where:{
                id: order_id,
            }
        });
        
        if(!orderFind){
            throw new Error("Este pedido não existe.")
        }

        const order = await prismaclient.order.delete({
            where:{
                id: order_id,
            }
        });
       
        return order
    }
}

export default new RemoveOrderService;