import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as sassMiddleware from 'node-sass-middleware';
import * as errorHandler from 'errorhandler';

import * as router from './Router';

export class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.configure();
    }

    private configure() {
        // uncomment after placing your favicon in /public
        //this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(sassMiddleware({
            src: path.join(__dirname, '../public'),
            dest: path.join(__dirname, '../public'),
            indentedSyntax: true, // true = .sass and false = .scss
            sourceMap: true
        }));

        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'pug');

        this.app.use(express.static(path.join(__dirname, '../public')));

        let expressRouter = express.Router();
        router.Router.setupRoutes(expressRouter);

        this.app.use('/*', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.header("Access-Control-Allow-Origin", "http://localhost");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.use(expressRouter);

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());

    }
}
