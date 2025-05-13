import prismaclient from "../../prisma";

class DetailOrderService{
    async execute({order_id}: {order_id: string}){
        const order = await prismaclient.orderItem.findMany({
            where:{
                order_id: order_id,
            },
            include:{
                product: true,
                order: true,
            }
        });

        if(!order) throw new Error("Nenhum pedido encontrado.");
        
        return order;
    }
}

export default new DetailOrderService;