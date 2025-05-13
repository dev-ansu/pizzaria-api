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
class AddItemService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ amount, order_id, product_id }) {
            const product = yield prisma_1.default.product.findUnique({
                where: {
                    id: product_id,
                }
            });
            const order = yield prisma_1.default.order.findUnique({
                where: {
                    id: order_id,
                }
            });
            if (!product || !order)
                throw new Error("Produto ou pedido não encontrado.");
            const price = product.price * amount;
            const orderItem = yield prisma_1.default.orderItem.create({
                data: {
                    amount,
                    order: { connect: { id: order_id } },
                    product: { connect: { id: product_id } },
                    price: price,
                },
            });
            return orderItem;
        });
    }
}
exports.default = new AddItemService;
