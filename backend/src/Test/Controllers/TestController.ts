import {Request, Response, NextFunction} from "express";

export class TestController {
    static Test(req: Request, res: Response, next: NextFunction) {
        res.send("Witam serdecznie");
    }
}