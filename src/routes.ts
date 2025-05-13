import { Router } from "express";
// import multer from "multer";
import { UserValidation } from "./middlewares/validations/user/user.validation";
import { ValidateErrors } from "./middlewares/validate.validations.errors";
import { HashUserPassowrd } from "./middlewares/validations/user/hash.user.password";
import CreateUserController from "./controllers/user/CreateUserController";
import { AuthValidation } from "./middlewares/validations/auth/auth.validation";
import AuthController from "./controllers/auth/AuthController";
import DetailUserController from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import CreateCategoryController from "./controllers/categories/CreateCategoryController";
import { CategoryValidation } from "./middlewares/validations/categories/category.validation";
import ListCategoryController from "./controllers/categories/ListCategoryController";
import CreateProductController from "./controllers/product/CreateProductController";
import { ProductValidation } from "./middlewares/validations/product/product.validation";
// import uploadConfig from "./config/multer";
import { ListByCategoryValidation } from "./middlewares/validations/product/listbycategory.validation";
import ListByCategoryController from "./controllers/product/ListByCategoryController";
import { OrderValidation } from "./middlewares/validations/order/order.validation";
import CreateOrderController from "./controllers/order/CreateOrderController";
import { OrderRemoveValidation } from "./middlewares/validations/order/order.remove.validation";
import RemoveOrderController from "./controllers/order/RemoveOrderController";
import { OrderAddItemValidation } from "./middlewares/validations/order/order.additem.validation";
import AddItemController from "./controllers/order/AddItemController";
import ListProductController from "./controllers/product/ListProductController";
import { OrderRemoveItemValidation } from "./middlewares/validations/order/order.removeitem.validation";
import RemoveItemController from "./controllers/order/RemoveItemController";
import { OrderSendValidation } from "./middlewares/validations/order/order.send.validation";
import SendOrderController from "./controllers/order/SendOrderController";
import ListOrdersController from "./controllers/order/ListOrdersController";
import { OrderDetailValidation } from "./middlewares/validations/order/order.detail.validation";
import DetailOrderController from "./controllers/order/DetailOrderController";
import FinishOrderController from "./controllers/order/FinishOrderController";


const router = Router();

// const upload = multer(uploadConfig.upload("./tmp"));

// -- INÍCIO ROTAS USERS -- //
    
    router.post("/users", UserValidation, ValidateErrors, HashUserPassowrd, CreateUserController.handle)
    router.get("/me", isAuthenticated, DetailUserController.handle)

    
// -- FIM ROTAS USERS -- //

// -- INÍCO ROTA AUTENTICAÇÃO -- //

    router.post("/session", AuthValidation, ValidateErrors, AuthController.handle)

// -- FIM ROTA AUTENTICAÇÃO -- //

// -- INÍCIO DAS ROTAS DE CATEGORIAS --//

    router.post("/category", isAuthenticated, CategoryValidation, ValidateErrors, CreateCategoryController.handle)
    router.get("/category", isAuthenticated, ListCategoryController.handle)

// -- FIM DAS ROTAS DE CATEGORIAS --//

// -- INÍCIO DAS ROTAS DE PRODUTOS --//

    // router.post("/product", isAuthenticated,upload.single('banner'), ProductValidation, ValidateErrors,  CreateProductController.handle)
    router.post("/product", isAuthenticated, ProductValidation, ValidateErrors,  CreateProductController.handle)
    router.get("/product", isAuthenticated, ListProductController.handle)
    router.get("/product/:category_id", isAuthenticated, ListByCategoryValidation, ValidateErrors,  ListByCategoryController.handle)

// -- FIM DAS ROTAS DE PRODUTOS -- //

// -- INÍCIO DAS ROTAS DE PEDIDOS -- //

    router.post("/order", isAuthenticated, OrderValidation, ValidateErrors,  CreateOrderController.handle)
    router.get("/order", isAuthenticated,  ListOrdersController.handle)

    router.get("/order/detail/:order_id", isAuthenticated, OrderDetailValidation, ValidateErrors, DetailOrderController.handle)
    
    router.delete("/order/:order_id", isAuthenticated, OrderRemoveValidation, ValidateErrors,  RemoveOrderController.handle)
    router.post("/order/additem", isAuthenticated, OrderAddItemValidation, ValidateErrors,  AddItemController.handle)
    router.delete("/order/removeitem/:item_id", isAuthenticated, OrderRemoveItemValidation, ValidateErrors,  RemoveItemController.handle)
    router.put("/order/send/:order_id", isAuthenticated, OrderSendValidation, ValidateErrors,  SendOrderController.handle);
    router.put("/order/finish/:order_id", isAuthenticated, OrderSendValidation, ValidateErrors,  FinishOrderController.handle);


// -- FIM DAS ROTAS DE PEDIDOS -- //

export { router }

