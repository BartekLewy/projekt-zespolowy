import * as express from 'express';
import {AuthenticationController} from "./Controllers/AuthenticationController";
import {ProductsController} from "./Controllers/ProductsController";
import multer = require("multer");
import * as path from "path";
import {OrderController} from "./Controllers/OrderController";
import {DiscountController} from "./Controllers/DiscountController";

export class Router {
    private static imageFilter(req: Express.Request, file: Express.Multer.File, cb: Function) {

        let filetypes = /jpeg|jpg|png|gif|webp|svg|tiff/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb({name: "UploadedFileTypeError", supportedTypes: String(filetypes), status: 400});
    }


    static setupRoutes(router: express.Router) {
        router.post("/register", AuthenticationController.AddUser);
        router.post("/login", AuthenticationController.Login);
        router.post("/operator/register", AuthenticationController.AddOperator);

        router.post("/product",
            multer({ fileFilter: Router.imageFilter, dest: __dirname + "/../public/images",
        }).array("picture", 1),
            ProductsController.AddProduct);

        router.get("/product", ProductsController.GetProductList);
        router.get("/product/:id", ProductsController.GetProductById);

        router.put("/product/:id",
            multer({ fileFilter: Router.imageFilter, dest: __dirname + "/../public/images",
        }).array("picture", 1),
            ProductsController.EditProduct);

        router.delete("/product/:id", ProductsController.DeleteProduct);

        router.post("/order", OrderController.AddOrder);
        router.get("/order", OrderController.GetAllOrders);
        router.get("/order/:id", OrderController.GetOrderById);
        router.put("/order/change/status/:id", OrderController.ChangeOrderStatus);

        router.get("/discount", DiscountController.GetAllDiscountCodes);
        router.get("/discount/:code", DiscountController.GetDiscountCode);
        router.post("/discount", DiscountController.GenerateDiscountCode);
        router.delete("/discount/:code", DiscountController.RemoveDiscountCode);
    }
}