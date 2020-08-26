function goHome() {
    $('#fadein-circle-1').animate({
        width: '10000px',
        height: '10000px'
    }, 1500);
    setTimeout(function () {
        $('#fadein-circle-2').animate({
            width: '10000px',
            height: '10000px'
        }, 1500);
    }, 100);
    setTimeout(function () {
        $('#fadein-circle-3').animate({
            width: '10000px',
            height: '10000px'
        }, 1500, function () {
            location.href='../project2b2';
        });
    }, 200);
}

function gameStart() {
    $('#fadein-circle-1').animate({
        width: '10000px',
        height: '10000px'
    }, 1500);
    setTimeout(function () {
        $('#fadein-circle-2').animate({
            width: '10000px',
            height: '10000px'
        }, 1500);
    }, 100);
    setTimeout(function () {
        $('#fadein-circle-3').animate({
            width: '10000px',
            height: '10000px'
        }, 1500, function () {
            location.href='./game';
        });
    }, 200);
}

function reload() {
    $('#fadein-circle-1').animate({
        width: '10000px',
        height: '10000px'
    }, 1500);
    setTimeout(function () {
        $('#fadein-circle-2').animate({
            width: '10000px',
            height: '10000px'
        }, 1500);
    }, 100);
    setTimeout(function () {
        $('#fadein-circle-3').animate({
            width: '10000px',
            height: '10000px'
        }, 1500, function () {
            location.href='./lank';
        });
    }, 200);
}

function resetLank() {
    let tempArr = {
        one: {name: 'N/A',score: 'N/A',time: 'N/A'},
        two: {name: 'N/A',score: 'N/A',time: 'N/A'},
        thr: {name: 'N/A',score: 'N/A',time: 'N/A'},
        fou: {name: 'N/A',score: 'N/A',time: 'N/A'},
        fiv: {name: 'N/A',score: 'N/A',time: 'N/A'},
        six: {name: 'N/A',score: 'N/A',time: 'N/A'},
        sev: {name: 'N/A',score: 'N/A',time: 'N/A'},
        eig: {name: 'N/A',score: 'N/A',time: 'N/A'},
        nin: {name: 'N/A',score: 'N/A',time: 'N/A'},
        ten: {name: 'N/A',score: 'N/A',time: 'N/A'},
    }
    localStorage.lank = JSON.stringify(tempArr);
    alert('초기화 되었습니다. 페이지를 새로고침합니다.');
    reload();
}

$(document).ready(function () {
    if (localStorage.getItem('lank') == null) {
        let tempArr = {
            one: {name: 'N/A',score: 'N/A',time: 'N/A'},
            two: {name: 'N/A',score: 'N/A',time: 'N/A'},
            thr: {name: 'N/A',score: 'N/A',time: 'N/A'},
            fou: {name: 'N/A',score: 'N/A',time: 'N/A'},
            fiv: {name: 'N/A',score: 'N/A',time: 'N/A'},
            six: {name: 'N/A',score: 'N/A',time: 'N/A'},
            sev: {name: 'N/A',score: 'N/A',time: 'N/A'},
            eig: {name: 'N/A',score: 'N/A',time: 'N/A'},
            nin: {name: 'N/A',score: 'N/A',time: 'N/A'},
            ten: {name: 'N/A',score: 'N/A',time: 'N/A'},
        }
        localStorage.lank = JSON.stringify(tempArr);
    }
    let lank = Object.values(JSON.parse(localStorage.lank));
    for (let i = 0; i < 10; i++) {
        $(`#Lname-${i + 1}`).html(lank[i].name);
        $(`#Lscore-${i + 1}`).html(lank[i].score);
        $(`#Ltime-${i + 1}`).html(lank[i].time);
    }
    $('#fadeout-circle-3').animate({
        width: '0px',
        height: '0px'
    }, 1500);
    setTimeout(function () {
        $('#fadeout-circle-2').animate({
            width: '0px',
            height: '0px'
        }, 1500);
    }, 100);
    setTimeout(function () {
        $('#fadeout-circle-1').animate({
            width: '0px',
            height: '0px'
        }, 1500);
    }, 200);
});