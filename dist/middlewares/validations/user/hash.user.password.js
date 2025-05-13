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
exports.HashUserPassowrd = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const HashUserPassowrd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        if (!password) {
            res.status(400).json({ error: "Senha obrigatória." });
            return;
        }
        const saltRounds = 10;
        const passwordWithPepper = password + process.env.PASSWORD_PEPPER_SECRET;
        const hashedPassword = yield bcrypt_1.default.hash(passwordWithPepper, saltRounds);
        req.body.password = hashedPassword; // Substitui a senha original pela hasheada
        next();
    }
    catch (err) {
        console.log("Erro ao hashear senha: ", err);
        res.status(500).json({ error: "Erro ao processar senha." });
    }
});
exports.HashUserPassowrd = HashUserPassowrd;
