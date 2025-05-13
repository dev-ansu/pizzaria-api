import prismaclient from "../../prisma";

interface OrderRequest{
    table: number;
    name: string;
}

class CreateOrderService{
    async execute({ table, name }: OrderRequest){
        const order = await prismaclient.order.create({
            data:{
                table: table,
                name: name,
            }
        });
        
        return order;        
    }
}

export default new CreateOrderService;