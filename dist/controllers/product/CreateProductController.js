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
const CreateProductService_1 = __importDefault(require("../../services/product/CreateProductService"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, category_id, description, price } = req.body;
            // if(!req.file){
            //     throw new Error("Erro no upload do arquivo."); 
            // }
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("Erro no upload do arquivo.");
            }
            // const { originalname, filename: banner } = req.file;
            const file = req.files['banner'];
            const resultFile = yield new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({}, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });
            const product = yield CreateProductService_1.default.execute({ name, banner: resultFile.url, category_id, description, price });
            res.json(product);
            return;
        });
    }
}
exports.default = new CreateProductController;
