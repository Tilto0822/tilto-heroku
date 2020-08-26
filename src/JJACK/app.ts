import express, {Request, Response} from 'express';
import * as path from 'path';

import {router as rp1} from './routes/project1';
import {router as rp2b1} from './routes/project2b1';
import {router as rp2b2} from './routes/project2b2';

class JJACK {
    public router: express.Router
    
    constructor() {
        this.router = express.Router();
        
        this.router.use('/index', rp1);
        this.router.use('/project1', rp1);
        this.router.use('/project2b1', rp2b1);
        this.router.use('/project2b2', rp2b2);
    }
}

export default JJACK;