function gameStart() {
    $('#fade-circle-1').animate({
        width: '10000px',
        height: '10000px'
    }, 1500);
    setTimeout(function () {
        $('#fade-circle-2').animate({
            width: '10000px',
            height: '10000px'
        }, 1500);
    }, 100);
    setTimeout(function () {
        $('#fade-circle-3').animate({
            width: '10000px',
            height: '10000px'
        }, 1500, function () {
            location.replace('project2b1/game');
        });
    }, 200);
}