const CARDS = [
    "1_G", "1_T", "1_P1", "1_P2",
    "2_Y", "2_T", "2_P1", "2_P2",
    "3_G", "3_T", "3_P1", "3_P2",
    "4_Y", "4_T", "4_P1", "4_P2",
    "5_Y", "5_T", "5_P1", "5_P2",
    "6_Y", "6_T", "6_P1", "6_P2",
    "7_Y", "7_T", "7_P1", "7_P2",
    "8_G", "8_Y", "8_P1", "8_P2",
    "9_Y", "9_T", "9_P1", "9_P2",
    "10_Y", "10_T", "10_P1", "10_P2",
    "11_G", "11_PP", "11_P1", "11_P2",
    "12_G", "12_Y", "12_T", "12_PP",
    "X_PP1", "X_PP2", "X_PPP"
];

const project = 'project3b2';

let containerInfo = {};

let playerSet = {
    p1: {
        cardMap: new Map(),
        backList: [],
        score: 0
    },
    p2: {
        cardMap: new Map(),
        backList: [],
        score: 0
    }
};

const sortSet = (a, b) => a - b;

function randomInt(min, max) {
    return Math.floor((Math.random() * (max + 1)) + min);
}

function getCardLink(card) {
    return `url(./images/hwatu/${card}.png)`;
}

function makeRandomHwatuArray(count) {
    let alreadyPick = [];
    let res = {
        count: count,
        array: []
    };
    for (let i = 0; i < res.count; i++) {
        let index = randomInt(0, CARDS.length - 1);
        let loop = 0;
        for (let item of alreadyPick) {
            if (item === index) loop = 1;
        }
        if (loop) i--;
        else {
            alreadyPick[alreadyPick.length] = index;
            res.array[res.array.length] = CARDS[index];
        }
    }
    return res;
}

function showCard(card, $container, x, y) {
    let cardMove = 20;
    let isRev;
    if ($container.hasClass('card-rev')) isRev = true;
    else isRev = false;

    let $card = $(`<div class="card-wrap"></div>`);
    let $incard = $(`<div class="card"></div>`);
    $card.css('bottom', `${y}px`);
    $card.css('left', `${x}px`);
    $incard.css('background-image', getCardLink(card));
    if (isRev) {
        $incard.css('transform', 'scaleY(-1)');
        $incard.css('bottom', '0');
    }
    $card.hover(function () {
        $card.stop(false, true);
        if (!isRev) $card.animate({
            height: (parseInt($card.css('height').split('px')[0])+cardMove).toString() + 'px'
        }, 150);
        else $card.animate({
            height: (parseInt($card.css('height').split('px')[0])+cardMove).toString() + 'px',
            bottom: (parseInt($card.css('bottom').split('px')[0])-cardMove).toString() + 'px'
        }, 150);
        previewCard(card, isRev);
    }, function () {
        $card.stop(false, true);
        if (!isRev) $card.animate({
            height: (parseInt($card.css('height').split('px')[0])-cardMove).toString() + 'px'
        }, 150);
        else $card.animate({
            height: (parseInt($card.css('height').split('px')[0])-cardMove).toString() + 'px',
            bottom: (parseInt($card.css('bottom').split('px')[0])+cardMove).toString() + 'px'
        }, 150);
    });
    $card.append($incard);
    $container.append($card);
}

let showTimeout;

function previewCard(card, isRev) {
    if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
    }
    if (isRev) $('.in-card').css('transform', 'scaleY(-1)');
    else $('.in-card').css('transform', 'scaleY(1)');
    $('.card-title').html(card);
    $('.card-shower').show();
    if ($('.in-card')) $('.in-card').css('background-image', getCardLink(card));
    showTimeout = setTimeout(function () {
        $('.card-shower').hide();
    }, 2000);
}

function sortCard(cardlist) {
    if (cardlist.length === 0) return [];
    let tempMap = new Map();
    let tempArr = [];
    let res = [];
    for (let card of cardlist) if (CARDS.indexOf(card) !== -1) tempMap.set(CARDS.indexOf(card), card);
    for (let index of tempMap.keys()) tempArr[tempArr.length] = index;
    tempArr.sort(sortSet);
    for (let index of tempArr) res[res.length] = CARDS[index];
    return res;
}

function checkScore(cardlist) {
    let score = 0;

    let G = cardlist.get('G');
    let Y = cardlist.get('Y');
    let T = cardlist.get('T');
    let P = cardlist.get('P');

    switch (G.length) {
        case 3:
            if (G.indexOf('12_G') !== -1) {
                score += 2;
                console.log('비삼광... - 점수 +2\n현재 점수 : '+score);
            } else {
                score += 3;
                console.log('삼광! - 점수 +3\n현재 점수 : '+score);
            }
            break;
        case 4:
            score += 4;
            console.log('사광! - 점수 +4\n현재 점수 : '+score);
            break;
        case 5:
            score += 15;
            console.log('오광! - 점수 +15\n현재 점수 : '+score);
            break;
        default:
            console.log('광 체크 건너뜀.\n현재 점수 : '+score);
            break;
    }

    if (Y.length > 4) {
        score += Y.length - 4;
        console.log(`열끗 점수 : +${(Y.length-4)}\n현재 점수 : ${score}`);
    }
    else console.log('열끗 체크 건너뜀.\n현재 점수 : '+score);

    if (T.length > 4) {
        score += T.length - 4;
        console.log(`띠 점수 : +${(T.length-4)}\n현재 점수 : ${score}`);
    }
    else console.log('띠 체크 건너뜀.\n현재 점수 : '+score);

    if (P.length > 9) {
        let temp = 0;
        temp += P.length - 9;
        if (P.indexOf('11_PP') !== -1) temp += 1;
        if (P.indexOf('12_PP') !== -1) temp += 1;
        if (P.indexOf('X_PP1') !== -1) temp += 1;
        if (P.indexOf('X_PP2') !== -1) temp += 1;
        if (P.indexOf('X_PPP') !== -1) temp += 2;
        score += temp;
        console.log(`피 점수 : +${temp}\n현재 점수 : ${score}`);
    }
    else console.log('피 체크 건너뜀.\n현재 점수 : '+score);

    if (Y.indexOf('2_Y') !== -1 && Y.indexOf('4_Y') !== -1 && Y.indexOf('8_Y') !== -1) {
        score += 5;
        console.log('고도리! - 점수 +5\n현재 점수 : '+score);
    }
    if (T.indexOf('1_T') !== -1 && T.indexOf('2_T') !== -1 && T.indexOf('3_T') !== -1) {
        score += 3;
        console.log('홍단! - 점수 +3\n현재 점수 : '+score);
    }
    if (T.indexOf('4_T') !== -1 && T.indexOf('5_T') !== -1 && T.indexOf('7_T') !== -1) {
        score += 3;
        console.log('초단! - 점수 +3\n현재 점수 : '+score);
    }
    if (T.indexOf('6_T') !== -1 && T.indexOf('9_T') !== -1 && T.indexOf('10_T') !== -1) {
        score += 3;
        console.log('청단! - 점수 +3\n현재 점수 : '+score);
    }
    return score;
}

function setCard(array, $container, cardRow, startX, startY) {
    if (!startX) startX = 0;
    if (!startY) startY = 0;
    let column = Math.floor(array.length / cardRow);
    if (array.length % cardRow == 0 && column !== 0) column--;
    startY += column * 90;
    let count = 0;
    let x = startX, y = startY;
    for (let card of array) {
        if (count === cardRow) {
            x = startX;
            y -= 90;
            count = 0;
        }
        showCard(card, $container, x, y);
        x += 40;
        count++;
    }
}

function checkBack() {
    if (playerSet.p2.cardMap.get('G').length >= 3 && playerSet.p1.cardMap.get('G').length == 0) playerSet.p1.backList[playerSet.p1.backList.length] = 'GBACK';
    if (playerSet.p1.cardMap.get('G').length >= 3 && playerSet.p2.cardMap.get('G').length == 0) playerSet.p2.backList[playerSet.p2.backList.length] = 'GBACK';
    if (playerSet.p2.cardMap.get('Y').length >= 7 && playerSet.p1.cardMap.get('Y').length < 3) playerSet.p1.backList[playerSet.p1.backList.length] = 'MBACK';
    if (playerSet.p1.cardMap.get('Y').length >= 7 && playerSet.p2.cardMap.get('Y').length < 3) playerSet.p2.backList[playerSet.p2.backList.length] = 'MBACK';

    let p1p = playerSet.p1.cardMap.get('P').length;
    if (playerSet.p1.cardMap.get('P').indexOf('11_PP') !== -1) p1p += 1;
    if (playerSet.p1.cardMap.get('P').indexOf('12_PP') !== -1) p1p += 1;
    if (playerSet.p1.cardMap.get('P').indexOf('X_PP1') !== -1) p1p += 1;
    if (playerSet.p1.cardMap.get('P').indexOf('X_PP2') !== -1) p1p += 1;
    if (playerSet.p1.cardMap.get('P').indexOf('X_PPP') !== -1) p1p += 2;

    let p2p = playerSet.p2.cardMap.get('P').length;
    if (playerSet.p2.cardMap.get('P').indexOf('11_PP') !== -1) p2p += 1;
    if (playerSet.p2.cardMap.get('P').indexOf('12_PP') !== -1) p2p += 1;
    if (playerSet.p2.cardMap.get('P').indexOf('X_PP1') !== -1) p2p += 1;
    if (playerSet.p2.cardMap.get('P').indexOf('X_PP2') !== -1) p2p += 1;
    if (playerSet.p2.cardMap.get('P').indexOf('X_PPP') !== -1) p2p += 2;

    if (p1p >= 10 && p2p > 0 && p2p < 8) playerSet.p2.backList[playerSet.p2.backList.length] = 'PBACK';
    if (p2p >= 10 && p1p > 0 && p1p < 8) playerSet.p1.backList[playerSet.p1.backList.length] = 'PBACK';

    for (let back of playerSet.p1.backList) {
        switch (back) {
            case 'GBACK':
                $('#1-back').html($('#1-back').html()+'<br />광박이요!~');
                break;
            case 'MBACK':
                $('#1-back').html($('#1-back').html()+'<br />멍박이요!~');
                break;
            case 'PBACK':
                $('#1-back').html($('#1-back').html()+'<br />피박이요!~');
                break;
        }
    }
    for (let back of playerSet.p2.backList) {
        switch (back) {
            case 'GBACK':
                $('#2-back').html($('#2-back').html()+'<br />광박이요!~');
                break;
            case 'MBACK':
                $('#2-back').html($('#2-back').html()+'<br />멍박이요!~')
                break;
            case 'PBACK':
                $('#2-back').html($('#2-back').html()+'<br />피박이요!~')
                break;
        }
    }
}

function rollCard() {
    return new Promise(function (response, reject) {
        let cardCount = randomInt(0, 51);
        $('#card-count').html('카드 수 : '+cardCount);
        $.post(`./${project}/organize-cards`, makeRandomHwatuArray(cardCount))
        .done(function (data) {
            let res = new Map(JSON.parse(data.sort));
            playerSet.p1.cardMap = res;
            playerSet.p1.score = checkScore(res);
            $('#card-score-1').html('1P 족보 점수 : '+playerSet.p1.score);
            res.set('G', sortCard(res.get('G')));
            res.set('Y', sortCard(res.get('Y')));
            res.set('T', sortCard(res.get('T')));
            res.set('P', sortCard(res.get('P')));
            setCard(res.get('G'), $('#GContainer1'), 10, 0, 20);
            setCard(res.get('Y'), $('#YContainer1'), 10, 0, 20);
            setCard(res.get('T'), $('#TContainer1'), 10, 0, 20);
            setCard(res.get('P'), $('#PContainer1'), 10, 0, 20);
            console.log(res);

            $.post(`./${project}/organize-cards`, makeRandomHwatuArray(cardCount))
            .done(function (data) {
                let res = new Map(JSON.parse(data.sort));
                playerSet.p2.cardMap = res;
                playerSet.p2.score = checkScore(res);
                $('#card-score-2').html('2P 족보 점수 : '+playerSet.p2.score);
                res.set('G', sortCard(res.get('G')));
                res.set('Y', sortCard(res.get('Y')));
                res.set('T', sortCard(res.get('T')));
                res.set('P', sortCard(res.get('P')));
                setCard(res.get('G'), $('#GContainer2'), 10, 0, 20);
                setCard(res.get('Y'), $('#YContainer2'), 10, 0, 20);
                setCard(res.get('T'), $('#TContainer2'), 10, 0, 20);
                setCard(res.get('P'), $('#PContainer2'), 10, 0, 20);
                console.log(res);
                response();
            });
        });
    });
}

function reset() {
    $('#GContainer1').html('G');
    $('#YContainer1').html('Y');
    $('#TContainer1').html('T');
    $('#PContainer1').html('P');
    $('#GContainer2').html('G');
    $('#YContainer2').html('Y');
    $('#TContainer2').html('T');
    $('#PContainer2').html('P');

    $('#1-back').html('1P<br />');
    $('#2-back').html('2P<br />');

    playerSet = {
        p1: {
            cardMap: new Map(),
            backList: [],
            score: 0
        },
        p2: {
            cardMap: new Map(),
            backList: [],
            score: 0
        }
    };

    rollCard().then(function () {
        checkBack();
    });
}

$(document).ready(function () {
    reset();
});