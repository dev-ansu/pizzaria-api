import prismaclient from "../../prisma";

export interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{

    async execute({ category_id }: ProductRequest){
        const findByCategory = await prismaclient.product.findMany({
            where:{
                category_id: category_id,
            }
        });
        if(!findByCategory) throw new Error("Nenhum produto encontrado com esta categoria");

        return {error: false, findByCategory};
    }
}


export default new ListByCategoryService;