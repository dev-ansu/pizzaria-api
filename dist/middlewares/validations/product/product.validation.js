"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const express_validator_1 = require("express-validator");
exports.ProductValidation = [
    (0, express_validator_1.body)("name").trim().escape().isString().isLength({ min: 1 }).withMessage("O nome do produto é obrigatório."),
    (0, express_validator_1.body)("price").trim().escape().customSanitizer(value => {
        value = value.trim();
        // Detecta e converte formatos válidos
        const commaCount = (value.match(/,/g) || []).length;
        const dotCount = (value.match(/\./g) || []).length;
        // Caso com "." e "," — assume padrão brasileiro
        if (dotCount > 0 && commaCount === 1) {
            value = value.replace(/\./g, "").replace(",", ".");
        }
        // Caso com "," e sem "." — assume padrão brasileiro simples
        else if (commaCount === 1 && dotCount === 0) {
            value = value.replace(",", ".");
        }
        // Caso com "." e sem "," — assume padrão americano
        else if (dotCount === 1 && commaCount === 0) {
            // ok, nada a fazer
        }
        // Se tiver múltiplos separadores, consideramos inválido
        else {
            return false;
        }
        return value;
    }).isFloat({ gt: 0 }).withMessage("O preço do produto é obrigatório e deve ser maior que 0 e com casas decimais separadas por ponto, ex.: 12.33, 30.00.").toFloat(),
    (0, express_validator_1.body)("description").trim().escape().isString().isLength({ min: 1 }).withMessage("A descrição do produto é obrigatória."),
    (0, express_validator_1.body)("category_id").trim().escape().isString().isLength({ min: 1 }).withMessage("A categoria é obrigatória.")
];
