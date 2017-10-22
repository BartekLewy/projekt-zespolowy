/**
 * Created by kdebowski on 13.07.17.
 */
import * as express from 'express';

import {TestController} from "./Controllers/TestController";

export class Router {
    static setupRoutes(router: express.Router, baseUrl: string) {
        router.get(baseUrl + '/', TestController.Test);
    }
}
