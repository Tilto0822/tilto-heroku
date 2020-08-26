import express, {Request, Response} from 'express';
import * as path from 'path';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('JJACK/p2b1/project2b1');
});

router.get('/game', (req: Request, res: Response) => {
    res.render('JJACK/p2b1/project2b1game');
});

router.use(express.static(path.join(__dirname, '/')));