import express, { NextFunction } from 'express';
import * as path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import {router as rIndex} from './routes/index';

class JJACK {
    private app: express.Application;
    
    constructor() {
        this.app = express();
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');

        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.route();
    }

    private route() {
        this.app.use('/', rIndex);
        this.app.use('/index', rIndex);

        this.app.use(function(req: any, res: any, next: NextFunction) { // TODO :: 정확한 타입 지정 필요
        next(createError(404));
        });

        this.app.use(function(err: any, req: any, res: any) { // TODO :: 정확한 타입 지정 필요
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        });
    }

    public getInstance() {
        return this.app;
    }
}

export default JJACK;