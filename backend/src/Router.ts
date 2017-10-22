import * as express from 'express';
import {Router as TestRouter} from "./Test/Router";

export class Router {
    static setupRoutes(router: express.Router) {
        TestRouter.setupRoutes(router, '/test');
    }
}
