import * as express from 'express';
import {AuthenticationController} from "./Controllers/AuthenticationController";

export class Router {
    static setupRoutes(router: express.Router) {
        router.post("/register", AuthenticationController.AddUser);
        router.post("/login", AuthenticationController.Login);
        router.post("/operator/register", AuthenticationController.AddOperator);
    }
}
