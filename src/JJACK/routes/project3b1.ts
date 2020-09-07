import express, {Request, Response} from 'express';
import * as path from 'path';

export const router = express.Router();

const getCardType = (card: string): string => {
    switch(card) {
        case '1_G':
        case '3_G':
        case '8_G':
        case '11_G':
        case '12_G':
            return 'G';
        case '2_Y':
        case '4_Y':
        case '5_Y':
        case '6_Y':
        case '7_Y':
        case '8_Y':
        case '9_Y':
        case '10_Y':
        case '11_Y':
        case '12_Y':
            return 'Y';
        case '1_T':
        case '2_T':
        case '3_T':
        case '4_T':
        case '5_T':
        case '6_T':
        case '7_T':
        case '9_T':
        case '10_T':
        case '12_T':
            return 'T';
        case '1_P1':
        case '1_P2':
        case '2_P1':
        case '2_P2':
        case '3_P1':
        case '3_P2':
        case '4_P1':
        case '4_P2':
        case '5_P1':
        case '5_P2':
        case '6_P1':
        case '6_P2':
        case '7_P1':
        case '7_P2':
        case '8_P1':
        case '8_P2':
        case '9_P1':
        case '9_P2':
        case '10_P1':
        case '10_P2':
        case '11_P1':
        case '11_P2':
        case '11_PP': // - 이하 특수패 (피로 취급)
        case '12_PP':
        case 'X_PP1':
        case 'X_PP2':
        case 'X_PPP':
            return 'P';
        // case '11_PP':
        // case '12_PP':
        // case 'X_PP1': - 더블
        // case 'X_PP2':
        // case 'X_PPP': - 트리플
        //     result.set('PP', result.get('PP')!); - 추후 변경
        //     break;
        default:
            return 'N';
    }
};

router.get('/', (req: Request, res: Response) => {
    res.render('JJACK/p3b1');
});

router.post('/organize-cards', (req: Request, res: Response) => {
    console.log(req.body.count);
    let hwatu: Array<string> = [];
    hwatu = req.body['array[]'];
    console.log(hwatu);
    let result: Map<string, Array<string>> = new Map<string, Array<string>>();
    result.set('G', []);
    result.set('Y', []);
    result.set('T', []);
    result.set('P', []);
    result.set('N', []);
    let temp: string[] = [];
    if (hwatu === undefined) {console.log('skipped');}
    else if (typeof hwatu === 'string') result.set(getCardType(hwatu), [hwatu]);
    else for (let i = 0; i < hwatu.length; i++) {
        temp = [];
        let type = getCardType(hwatu[i]);
        temp = result.get(type)!;
        temp.push(hwatu[i]);
        result.set(type, temp);
    }
    console.log(result);
    res.send({
        count: req.body.count,
        sort: JSON.stringify(Array.from(result.entries()))
    });
});

router.use(express.static(path.join(__dirname, '/')));