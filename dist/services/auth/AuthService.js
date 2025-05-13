"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const existsUser = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                }
            });
            if (!existsUser)
                throw new Error("Usuário ou senha está incorreto.");
            const passwordWithPepper = password + process.env.PASSWORD_PEPPER_SECRET;
            const passwordIsValid = yield (0, bcrypt_1.compare)(passwordWithPepper, existsUser.password);
            if (!passwordIsValid)
                throw new Error("Usuário ou senha está incorreto.");
            // Gerar um token JWT e devolver os dados do usuário
            const payloadToken = {
                id: existsUser.id,
                name: existsUser.name,
                email: existsUser.email,
                created_at: existsUser.created_at,
            };
            const token = (0, jsonwebtoken_1.sign)(payloadToken, process.env.JWT_SECRET, {
                subject: existsUser.id,
                expiresIn: '30d'
            });
            return {
                error: false,
                message: "Autenticação realizada com sucesso",
                user: payloadToken,
                token: token
            };
        });
    }
}
exports.default = new AuthService;
