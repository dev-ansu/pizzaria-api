import { compare } from "bcrypt";
import { Service } from "../../interfaces/Service";
import prismaclient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}


class AuthService implements Service<AuthRequest, {}>{
    async execute({email, password}: AuthRequest){
        const existsUser = await prismaclient.user.findFirst({
            where:{
                email: email,
            }
        });
        if(!existsUser) throw new Error("Usuário ou senha está incorreto.");
     
        const passwordWithPepper = password + process.env.PASSWORD_PEPPER_SECRET;
        const passwordIsValid = await compare(passwordWithPepper, existsUser.password);
        
        if(!passwordIsValid) throw new Error("Usuário ou senha está incorreto.")
        
        // Gerar um token JWT e devolver os dados do usuário
        const payloadToken = {
            id: existsUser.id,
            name: existsUser.name,
            email: existsUser.email,
            created_at: existsUser.created_at,
        }


        const token = sign(payloadToken,
            process.env.JWT_SECRET as string,
            {
                subject: existsUser.id,
                expiresIn: '30d'
            }
        )
            
        return {
            error: false, 
            message: "Autenticação realizada com sucesso", 
            user: payloadToken,
            token: token
        };        
    }
}


export default new AuthService;