import prismaclient from "../../prisma";

interface ItemRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService{
    
    async execute({amount,order_id,product_id}: ItemRequest){
        const product = await prismaclient.product.findUnique({
            where:{
                id: product_id,
            }
        });

        const order = await prismaclient.order.findUnique({
            where:{
                id: order_id,
            }
        });

        if(!product || !order) throw new Error("Produto ou pedido não encontrado.");

        const price = product.price * amount;

        const orderItem = await prismaclient.orderItem.create({
            data:{
                amount,
                order: {connect: {id: order_id}},
                product: { connect: {id: product_id} },
                price: price,
            },
        });

        return orderItem;

    }
}


export default new AddItemService;