import prismaclient from "../../prisma";

interface ItemRequest{
    item_id: string;
}

class RemoveItemService{
    
    async execute({item_id}: ItemRequest){
        const item = await prismaclient.orderItem.findUnique({
            where:{
                id: item_id,
            }
        });

        if(!item) throw new Error("Item do pedido não encontrado.");


        const orderItem = await prismaclient.orderItem.delete({
            where:{
                id: item_id
            }
        });

        return orderItem;

    }
}


export default new RemoveItemService;