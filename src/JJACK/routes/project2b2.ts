import express, {Request, Response} from 'express';
import * as path from 'path';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('JJACK/p2b2/project2b2');
});

router.get('/game', (req: Request, res: Response) => {
    res.render('JJACK/p2b2/project2b2game');
});

router.get('/lank', (req: Request, res: Response) => {
    res.render('JJACK/p2b2/project2b2lank');
});

router.use(express.static(path.join(__dirname, '/')));