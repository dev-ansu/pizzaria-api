"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const user_validation_1 = require("./middlewares/validations/user/user.validation");
const validate_validations_errors_1 = require("./middlewares/validate.validations.errors");
const hash_user_password_1 = require("./middlewares/validations/user/hash.user.password");
const CreateUserController_1 = __importDefault(require("./controllers/user/CreateUserController"));
const auth_validation_1 = require("./middlewares/validations/auth/auth.validation");
const AuthController_1 = __importDefault(require("./controllers/auth/AuthController"));
const DetailUserController_1 = __importDefault(require("./controllers/user/DetailUserController"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateCategoryController_1 = __importDefault(require("./controllers/categories/CreateCategoryController"));
const category_validation_1 = require("./middlewares/validations/categories/category.validation");
const ListCategoryController_1 = __importDefault(require("./controllers/categories/ListCategoryController"));
const CreateProductController_1 = __importDefault(require("./controllers/product/CreateProductController"));
const product_validation_1 = require("./middlewares/validations/product/product.validation");
const multer_2 = __importDefault(require("./config/multer"));
const listbycategory_validation_1 = require("./middlewares/validations/product/listbycategory.validation");
const ListByCategoryController_1 = __importDefault(require("./controllers/product/ListByCategoryController"));
const order_validation_1 = require("./middlewares/validations/order/order.validation");
const CreateOrderController_1 = __importDefault(require("./controllers/order/CreateOrderController"));
const order_remove_validation_1 = require("./middlewares/validations/order/order.remove.validation");
const RemoveOrderController_1 = __importDefault(require("./controllers/order/RemoveOrderController"));
const order_additem_validation_1 = require("./middlewares/validations/order/order.additem.validation");
const AddItemController_1 = __importDefault(require("./controllers/order/AddItemController"));
const ListProductController_1 = __importDefault(require("./controllers/product/ListProductController"));
const order_removeitem_validation_1 = require("./middlewares/validations/order/order.removeitem.validation");
const RemoveItemController_1 = __importDefault(require("./controllers/order/RemoveItemController"));
const order_send_validation_1 = require("./middlewares/validations/order/order.send.validation");
const SendOrderController_1 = __importDefault(require("./controllers/order/SendOrderController"));
const ListOrdersController_1 = __importDefault(require("./controllers/order/ListOrdersController"));
const order_detail_validation_1 = require("./middlewares/validations/order/order.detail.validation");
const DetailOrderController_1 = __importDefault(require("./controllers/order/DetailOrderController"));
const FinishOrderController_1 = __importDefault(require("./controllers/order/FinishOrderController"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// -- INÍCIO ROTAS USERS -- //
router.post("/users", user_validation_1.UserValidation, validate_validations_errors_1.ValidateErrors, hash_user_password_1.HashUserPassowrd, CreateUserController_1.default.handle);
router.get("/me", isAuthenticated_1.isAuthenticated, DetailUserController_1.default.handle);
// -- FIM ROTAS USERS -- //
// -- INÍCO ROTA AUTENTICAÇÃO -- //
router.post("/session", auth_validation_1.AuthValidation, validate_validations_errors_1.ValidateErrors, AuthController_1.default.handle);
// -- FIM ROTA AUTENTICAÇÃO -- //
// -- INÍCIO DAS ROTAS DE CATEGORIAS --//
router.post("/category", isAuthenticated_1.isAuthenticated, category_validation_1.CategoryValidation, validate_validations_errors_1.ValidateErrors, CreateCategoryController_1.default.handle);
router.get("/category", isAuthenticated_1.isAuthenticated, ListCategoryController_1.default.handle);
// -- FIM DAS ROTAS DE CATEGORIAS --//
// -- INÍCIO DAS ROTAS DE PRODUTOS --//
// router.post("/product", isAuthenticated,upload.single('banner'), ProductValidation, ValidateErrors,  CreateProductController.handle)
router.post("/product", isAuthenticated_1.isAuthenticated, product_validation_1.ProductValidation, validate_validations_errors_1.ValidateErrors, CreateProductController_1.default.handle);
router.get("/product", isAuthenticated_1.isAuthenticated, ListProductController_1.default.handle);
router.get("/product/:category_id", isAuthenticated_1.isAuthenticated, listbycategory_validation_1.ListByCategoryValidation, validate_validations_errors_1.ValidateErrors, ListByCategoryController_1.default.handle);
// -- FIM DAS ROTAS DE PRODUTOS -- //
// -- INÍCIO DAS ROTAS DE PEDIDOS -- //
router.post("/order", isAuthenticated_1.isAuthenticated, order_validation_1.OrderValidation, validate_validations_errors_1.ValidateErrors, CreateOrderController_1.default.handle);
router.get("/order", isAuthenticated_1.isAuthenticated, ListOrdersController_1.default.handle);
router.get("/order/detail/:order_id", isAuthenticated_1.isAuthenticated, order_detail_validation_1.OrderDetailValidation, validate_validations_errors_1.ValidateErrors, DetailOrderController_1.default.handle);
router.delete("/order/:order_id", isAuthenticated_1.isAuthenticated, order_remove_validation_1.OrderRemoveValidation, validate_validations_errors_1.ValidateErrors, RemoveOrderController_1.default.handle);
router.post("/order/additem", isAuthenticated_1.isAuthenticated, order_additem_validation_1.OrderAddItemValidation, validate_validations_errors_1.ValidateErrors, AddItemController_1.default.handle);
router.delete("/order/removeitem/:item_id", isAuthenticated_1.isAuthenticated, order_removeitem_validation_1.OrderRemoveItemValidation, validate_validations_errors_1.ValidateErrors, RemoveItemController_1.default.handle);
router.put("/order/send/:order_id", isAuthenticated_1.isAuthenticated, order_send_validation_1.OrderSendValidation, validate_validations_errors_1.ValidateErrors, SendOrderController_1.default.handle);
router.put("/order/finish/:order_id", isAuthenticated_1.isAuthenticated, order_send_validation_1.OrderSendValidation, validate_validations_errors_1.ValidateErrors, FinishOrderController_1.default.handle);
