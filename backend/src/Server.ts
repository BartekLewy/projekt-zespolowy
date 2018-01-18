import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as sassMiddleware from 'node-sass-middleware';
import * as errorHandler from 'errorhandler';
import * as mongoose from "mongoose";
import * as jwt from "express-jwt";

import {NextFunction, Response, Request} from "express";

import * as router from './Router';
import * as multer from "multer";
import * as morgan from "morgan";

declare global {
    namespace Express {
        export interface Request {
            tokenData?: any
        }
    }
}

export class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor(test: boolean = false) {
        this.app = express();
        this.configure();
    }

    private configure() {
        // region Ustawienia favicon
        // uncomment after placing your favicon in /public
        //this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        // endregion

        // region Ustawienia logów node.js
        this.app.use(logger('dev'));
        // endregion

        // region Ustawienia Express.js
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(sassMiddleware({
            src: path.join(__dirname, '../public'),
            dest: path.join(__dirname, '../public'),
            indentedSyntax: true, // true = .sass and false = .scss
            sourceMap: true
        }));

        this.app.use(express.static(path.join(__dirname, '../public')));

        // this.app.use(multer({ dest: path.join(__dirname, '../public/images') }).any());

        // endregion

        // region Ustawienia autentykacji tokenem
        this.app.use(jwt({
                secret: 'projekt-zespołowy',
                credentialsRequired: false,
                requestProperty: 'tokenData',
                getToken: function fromHeader (req) {
                    if (req.header('Authentication') && req.header('Authentication').split(' ')[0] === 'Bearer') {
                        return req.header('Authentication').split(' ')[1];
                    }
                    console.log("[ERR] nie podano tokena");
                    return null;
                }
            }).unless({
                path: [
                    '/public/api.yml',
                    '/login',
                    '/users'
                ]
            })
        );
        // endregion

        // region Ustawienia błędów dostępu
        this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).json({'err': 'Brak autoryzacji'});
            }
        });

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());
        // endregion

        // region Ustawienia bazy danych
        mongoose.connect('mongodb://mongo:27017/projekt-grupowy');
        // endregion

        // region Ustawienia routingu
        let expressRouter = express.Router();
        router.Router.setupRoutes(expressRouter);

        this.app.use('/*', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication, api_key, Authorization");
            res.header('Access-Control-Expose-Headers', "Authentication");
            next();
        });

        this.app.use("/public", express.static('public'));
        this.app.use(expressRouter);
        // endregion

    }
}
