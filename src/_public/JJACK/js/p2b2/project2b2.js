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
            location.href='project2b2/game';
        });
    }, 200);
}

function goLank() {
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
            location.href='project2b2/lank';
        });
    }, 200);
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