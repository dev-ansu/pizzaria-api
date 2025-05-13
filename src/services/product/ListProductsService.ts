import prismaclient from "../../prisma";

class ListProductsService{

    async execute(){
        const products = await prismaclient.product.findMany();
        
        if(!products) throw new Error("Nenhum produto encontrado.");

        return {error: false, products};
    }
}


export default new ListProductsService;