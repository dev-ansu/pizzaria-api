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
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveItemService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ item_id }) {
            const item = yield prisma_1.default.orderItem.findUnique({
                where: {
                    id: item_id,
                }
            });
            if (!item)
                throw new Error("Item do pedido não encontrado.");
            const orderItem = yield prisma_1.default.orderItem.delete({
                where: {
                    id: item_id
                }
            });
            return orderItem;
        });
    }
}
exports.default = new RemoveItemService;
