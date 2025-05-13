import { Prisma } from "../../generated/prisma";
import prismaclient from "../../prisma";

export interface ProductRequest{
    name: string;
    price: number;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService{
    async execute({ name, banner,category_id,description,price }: ProductRequest){
        try{

            const product = await prismaclient.product.create({
                data:{
                    name: name,
                    banner: banner,
                    description,
                    price: price,
                    category:{ connect: { id: category_id }}
                }
            })
            
            return {error: false, message:"Produto cadastrado com sucesso", product};
        }catch(err){
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    throw new Error("A categoria selecionada não existe.");
                }
            }
        }
    }
}


export default new CreateProductService;