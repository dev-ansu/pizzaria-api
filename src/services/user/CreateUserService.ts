import { Service } from "../../interfaces/Service";
import prismaclient from "../../prisma";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService implements Service<UserRequest, {}>{
    async execute( { name, email, password }: UserRequest){
        const alreadyExists = await prismaclient.user.findFirst({
            where: { 
                email: email
             }
        });
        
        if(alreadyExists){
            throw new Error("Este usuário já existe.")
        }

        const user = await prismaclient.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
            select:{
                id: true,
                name: true,
                email: true,
                created_at: true,
            }
        });

        return user;
    }
}

export default new CreateUserService;