import express, {Request, Response} from 'express';
import * as path from 'path';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('JJACK/index');
});

router.use(express.static(path.join(__dirname, '/')));