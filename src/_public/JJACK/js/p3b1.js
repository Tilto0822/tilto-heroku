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

const project = 'project3b1';

let containerInfo = {};

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
            height: (parseInt($card.css('height').split('px')[0])+30).toString() + 'px'
        }, 200);
        else $card.animate({
            height: (parseInt($card.css('height').split('px')[0])+30).toString() + 'px',
            bottom: (parseInt($card.css('bottom').split('px')[0])-30).toString() + 'px'
        }, 200);
        viewCard(card, isRev);
    }, function () {
        $card.stop(false, true);
        if (!isRev) $card.animate({
            height: (parseInt($card.css('height').split('px')[0])-30).toString() + 'px'
        }, 200);
        else $card.animate({
            height: (parseInt($card.css('height').split('px')[0])-30).toString() + 'px',
            bottom: (parseInt($card.css('bottom').split('px')[0])+30).toString() + 'px'
        }, 200);
    });
    $card.append($incard);
    $container.append($card);
}

let showTimeout;

function viewCard(card, isRev) {
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

function rollCard() {
    reset();
    $.post(`./${project}/organize-cards`, makeRandomHwatuArray(randomInt(0, 51)))
    .done(function (data) {
        let res = new Map(JSON.parse(data.sort));
        $('#card-count').html('총 카드 수 : '+data.count);
        $('#card-score').html('족보 점수 : '+checkScore(res));
        res.set('G', sortCard(res.get('G')));
        res.set('Y', sortCard(res.get('Y')));
        res.set('T', sortCard(res.get('T')));
        res.set('P', sortCard(res.get('P')));
        let x = 0;
        let count = 1;
        let y = 170;
        for (let card of res.get('G')) {
            if (count === 6) {
                x = 0;
                y -= 90;
                count = 1;
            }
            showCard(card, $('#GContainer'), x, y);
            x += 40;
            count++;
        }
        x = 0;
        count = 1;
        y = 170;
        for (let card of res.get('Y')) {
            if (count === 6) {
                x = 0;
                y -= 90;
                count = 1;
            }
            showCard(card, $('#YContainer'), x, y);
            x += 40;
            count++;
        }
        x = 0;
        count = 1;
        y = 170;
        for (let card of res.get('T')) {
            if (count === 6) {
                x = 0;
                y -= 90;
                count = 1;
            }
            showCard(card, $('#TContainer'), x, y);
            x += 40;
            count++;
        }
        x = 0;
        count = 1;
        y = 170;
        for (let card of res.get('P')) {
            if (count === 11) {
                x = 0;
                y -= 90;
                count = 1;
            }
            showCard(card, $('#PContainer'), x, y);
            x += 40;
            count++;
        }
        console.log(res);
    });
}

function reset() {
    $('#GContainer').html('G');
    $('#YContainer').html('Y');
    $('#TContainer').html('T');
    $('#PContainer').html('P');
}

$(document).ready(function () {
    rollCard();
});