import express, {NextFunction} from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

import JJACK from './JJACK/app';
import root from './root/app';

class ExpressServer {
    private app: express.Application
    private root: root
    private JJACK: JJACK

    constructor () {
        this.app = express();
        this.root = new root();
        this.JJACK = new JJACK();

        this.app.set('views', path.join(__dirname, '_views'));
        this.app.set('view engine', 'ejs');
        this.app.use(express.static(path.join(__dirname, '_public')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        this.route();
    }

    private route() {
        this.app.use('/', this.root.router);
        this.app.use('/JJACK', this.JJACK.router);

        this.app.use(function(req: any, res: any, next: NextFunction) { // TODO :: 정확한 타입 지정 필요
            next(createError(404));
        });

        this.app.use(function(err: any, req: any, res: any) { // TODO :: 정확한 타입 지정 필요
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
        });
    }

    public getInstance(): express.Application {
        return this.app;
    }
}

const WebServer = new ExpressServer();
const WebApp: express.Application = WebServer.getInstance();

WebApp.listen(process.env.PORT || 80, () => {
    console.log('WebServer - Express on!');
})