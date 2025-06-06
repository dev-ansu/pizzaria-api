import { Service } from "../../interfaces/Service";
import prismaclient from "../../prisma";

class ListCategoryService{
    async execute(){
        
        const categories = await prismaclient.category.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return categories;
    }
}

export default new ListCategoryService;