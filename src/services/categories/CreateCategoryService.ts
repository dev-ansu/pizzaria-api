import { Service } from "../../interfaces/Service";
import prismaclient from "../../prisma";

interface CategoryRequest{
    name: string
}

class CreateCategoryService implements Service<CategoryRequest,{}>{
    async execute({ name }: CategoryRequest): Promise<any> {
        const exists = await prismaclient.category.findFirst({
            where: {
                name: name,
            }
        });

        if(exists) throw new Error("Esta categoria ja existe.")
        
        const created = await prismaclient.category.create({
            data:{ name },
            select:{
                id: true,
                name: true,
            }
        })

        return {error: false, created, message: "Categoria cadastrada com sucesso."};
    }
}

export default new CreateCategoryService;