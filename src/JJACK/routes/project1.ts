import express, {Request, Response} from 'express';
import * as path from 'path';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('JJACK/project1');
});

router.use(express.static(path.join(__dirname, '/')));