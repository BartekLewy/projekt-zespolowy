import * as express from 'express';
import {AuthenticationController} from "./Controllers/AuthenticationController";
import {ProductsController} from "./Controllers/ProductsController";

export class Router {
    static setupRoutes(router: express.Router) {
        router.post("/register", AuthenticationController.AddUser);
        router.post("/login", AuthenticationController.Login);
        router.post("/operator/register", AuthenticationController.AddOperator);
        router.post("/product", ProductsController.AddProduct);
    }
}
