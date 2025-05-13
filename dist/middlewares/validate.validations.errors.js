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
exports.ValidateErrors = void 0;
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ValidateErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req); // verifica os erros de validação
    if (!errors.isEmpty()) {
        if (req.file) {
            fs_1.default.unlink(path_1.default.resolve(req.file.path), (err) => {
                if (err)
                    console.error("Erro ao deletar arquivo:", err);
            });
        }
        // Se usar múltiplos arquivos:
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                try {
                    yield fs_1.default.promises.unlink(path_1.default.resolve(file.path));
                }
                catch (err) {
                    console.error("Erro ao deletar arquivo:", err);
                }
            }
        }
        res.status(400).json({ errors: errors.array() }); // Retorna erros caso existam
        return;
    }
    next(); // Se não houver errors, passa para o próximo middleware
});
exports.ValidateErrors = ValidateErrors;
