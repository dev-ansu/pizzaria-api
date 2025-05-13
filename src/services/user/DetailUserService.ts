import { Service } from "../../interfaces/Service";
import prismaclient from "../../prisma";


class DetailUserService implements Service<string, {}>{
    async execute(user_id: string){

        const user = await prismaclient.user.findFirst({
            where: {
                id: user_id,
            },
            select:{
                id:true,
                name:true,
                email: true,
                created_at: true,
                updated_at: true
            }
        })

        return user;
    }
}

export default new DetailUserService;