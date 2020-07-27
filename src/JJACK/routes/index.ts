import express, {Request, Response} from 'express';
import * as path from 'path';

export const router = express.Router();

console.log(path.join(__dirname, '/'));

router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

router.use(express.static(path.join(__dirname, '/')));