import express, {Request, Response} from 'express';
import * as path from 'path';

import {router as rIndex} from './routes/index';

class JJACK {
    public router: express.Router
    
    constructor() {
        this.router = express.Router();

        this.router.use('/', rIndex);
        this.router.use('/index', rIndex);
    }
}

export default JJACK;