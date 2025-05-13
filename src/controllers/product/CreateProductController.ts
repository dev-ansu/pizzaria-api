import { Request, Response } from "express";
import CreateProductService, { ProductRequest } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload"
import {v2 as cloudinary, UploadApiResponse} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

class CreateProductController{
    async handle(req: Request, res: Response){
        const { name, category_id,description,price } = req.body as ProductRequest;
        
        // if(!req.file){
        //     throw new Error("Erro no upload do arquivo."); 
        // }
        if(!req.files || Object.keys(req.files).length === 0){
            throw new Error("Erro no upload do arquivo."); 
        }

        // const { originalname, filename: banner } = req.file;
        const file: UploadedFile = req.files['banner'];
        const resultFile: UploadApiResponse = await new Promise((resolve, reject)=>{
            cloudinary.uploader.upload_stream({}, (error, result)=>{
                if(error){
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(file.data);
        })

               
        const product = await CreateProductService.execute({name,banner: resultFile.url,category_id,description,price});

        res.json(product)
        return;
    }
}


export default new CreateProductController;