import prismaclient from "../../prisma";

class ListOrdersService{

    async execute(){
        const orders = await prismaclient.order.findMany({
            where:{
                status: false,
                draft: false,
            },
            orderBy:{
                created_at: "desc"
            }
        });
        
        if(!orders) throw new Error("Nenhum pedido encontrado.");

        return orders;
    }
}


export default new ListOrdersService;