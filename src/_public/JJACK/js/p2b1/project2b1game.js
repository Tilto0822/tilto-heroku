let gameboard = new Array(21);
for (let i = 0; i < 21; i++) {
    gameboard[i] = new Array(21);
}

let moveDelay = 300;
let input = [];
let time = 0;
let highscore = 0;
let score = 3;
let gameLogic;
let timer;
let isStart = false;

let item;

class Vector2 {
    x
    y
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add (x, y) {
        this.x += x;
        this.y += y;
    }
}

let inString = '';

let cell = {
    blank: 1,
    item: 2,
    snake_body: 3,
    snake_head: 4
}

let rotate = {
    north: 1,
    west: 2,
    east: 3,
    south: 4
}

let arrow = {
    left : 37,
    up : 38,
    right : 39,
    down : 40
}

let snake = {
    snake_head: new Vector2(10, 10),
    snake_body: [new Vector2(10, 11), new Vector2(10, 12)],
    snake_eye: rotate.north,
    item_ate: false
}

function isGameOver() {
    if (snake.snake_head.x < 0 || snake.snake_head.x > 20 || snake.snake_head.y < 0 || snake.snake_head.y > 20) return true;
    else return false;
}

function setTile(vector2, cellType) {
    gameboard[vector2.y][vector2.x] = cellType;
}

function getTile(vector2) {
    return gameboard[vector2.y][vector2.x];
}

function addScore() {
    score++;
    $('#score-counter').html(score);
}

function startGame() {
    if (isStart) return;
    isStart = true;
    resetGame();
    time++;
    $('#time-counter').html(time);
    timer = setInterval(function () {
        time++;
        $('#time-counter').html(time);
    }, 1000);
    gameLogic = setInterval(function () {
        moveSnake();
    }, moveDelay);
}

function gameOver() {
    clearInterval(gameLogic);
    clearInterval(timer);
    if (score > highscore) {
        highscore = score;
        $('#high-counter').html(highscore);
    }
    $('#head-text').html('GAME OVER');
    $('#body-text').html(`HIGH SCORE : ${highscore}<br />SCORE : ${score}<br /><br /> CLICK TO RESTART`);
    $('#cover-pos').show();
    $('#cover-pos').animate({
        opacity: 0.8
    }, 300, function () {
        // resetGame();
    });
    isStart = false;
}

function snakeRotate() {
    for (;;) {
        if (input.length !== 0) {
            if (snake.snake_eye == rotate.north) {
                if (input.length !== 0) if (input[0] === arrow.up || input[0] === arrow.down) {
                    input.splice(0, 1);
                    continue;
                }
                else if (input[0] === arrow.left) {
                    snake.snake_eye = rotate.west;
                    input.splice(0, 1);
                } else if (input[0] === arrow.right) {
                    snake.snake_eye = rotate.east;
                    input.splice(0, 1);
                } else console.log('err');
                break;
            } else if (snake.snake_eye == rotate.east) {
                if (input.length !== 0) if (input[0] === arrow.right || input[0] === arrow.left) {
                    input.splice(0, 1);
                    continue;
                }
                else if (input[0] === arrow.up) {
                    snake.snake_eye = rotate.north;
                    input.splice(0, 1);
                } else if (input[0] === arrow.down) {
                    snake.snake_eye = rotate.south;
                    input.splice(0, 1);
                } else console.log('err');
                break;
            } else if (snake.snake_eye == rotate.west) {
                if (input.length !== 0) if (input[0] === arrow.left || input[0] === arrow.right) {
                    input.splice(0, 1);
                    continue;
                }
                else if (input[0] === arrow.up) {
                    snake.snake_eye = rotate.north;
                    input.splice(0, 1);
                } else if (input[0] === arrow.down) {
                    snake.snake_eye = rotate.south;
                    input.splice(0, 1);
                } else console.log('err');
                break;
            } else if (snake.snake_eye == rotate.south) {
                if (input.length !== 0) if (input[0] === arrow.down || input[0] === arrow.up) {
                    input.splice(0, 1);
                    continue;
                }
                else if (input[0] === arrow.left) {
                    snake.snake_eye = rotate.west;
                    input.splice(0, 1);
                } else if (input[0] === arrow.right) {
                    snake.snake_eye = rotate.east;
                    input.splice(0, 1);
                } else console.log('err');
                break;
            }
        } else break;
    }
}

function moveSnake() {
    snake.snake_body.unshift(new Vector2(snake.snake_head.x, snake.snake_head.y));
    snakeRotate();
    switch (snake.snake_eye) {
        case rotate.north:
            snake.snake_head.add(0, -1);
            break;
        case rotate.east:
            snake.snake_head.add(1, 0);
            break;
        case rotate.west:
            snake.snake_head.add(-1, 0);
            break;
        case rotate.south:
            snake.snake_head.add(0, 1);
            break;
    }
    if (isGameOver()) return gameOver();
    if (getTile(new Vector2(snake.snake_head.x, snake.snake_head.y)) === cell.item) {
        snake.item_ate = true;
        addScore();
        setTile(new Vector2(snake.snake_head.x, snake.snake_head.y), cell.snake_head);
        genItem();
    }
    if (!snake.item_ate) {
        setTile(new Vector2(snake.snake_body[snake.snake_body.length - 1].x, snake.snake_body[snake.snake_body.length - 1].y), cell.blank);
        snake.snake_body.splice(snake.snake_body.length - 1, 1);
    } else snake.item_ate = false;
    drawSnake();
    drawGame();
}

function drawSnake() {
    for (let i = 0; i < snake.snake_body.length; i++) {
        setTile(new Vector2(snake.snake_body[i].x, snake.snake_body[i].y), cell.snake_body);
    }
    if (getTile(new Vector2(snake.snake_head.x, snake.snake_head.y)) === cell.snake_body) gameOver();
    setTile(new Vector2(snake.snake_head.x, snake.snake_head.y), cell.snake_head);
}

function genItem() {
    for (;;) {
        let temp = new Vector2(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
        if (getTile(new Vector2(temp.x, temp.y)) === cell.blank) {
            item = new Vector2(temp.x, temp.y);
            setTile(new Vector2(item.x, item.y), cell.item);
            break;
        }
    }
}

function drawGame() {
    $('#cell-container').html('');
    inString = '';
    for (let i = 0; i < 21; i++) {
        inString += '<div class="cell-row-container">';
        for (let j = 0; j < 21; j++) {
            switch(gameboard[i][j]) {
                case cell.blank:
                    inString += '<div class="cell cell-blank"></div>';
                    break;
                case cell.item:
                    inString += '<div class="cell cell-item"></div>';
                    break;
                case cell.snake_body:
                    inString += '<div class="cell cell-snake-body"></div>';
                    break;
                case cell.snake_head:
                    inString += '<div class="cell cell-snake-head"></div>';
                    break;
            }
        }
        inString += '</div>';
    }
    $('#cell-container').html(inString);
}

function resetGame() {
    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
            setTile(new Vector2(i, j), cell.blank);
        }
    }
    snake.snake_head = new Vector2(10, 10);
    snake.snake_body = [new Vector2(10, 11), new Vector2(10, 12)];
    snake.snake_eye = rotate.north;
    snake.item_ate = false;
    time = 0;
    $('#time-counter').html(time);
    score = 3;
    $('#score-counter').html(score);
    drawSnake();
    genItem();
    drawGame();
}

function hideCover() {
    $('#cover-pos').animate({
        opacity: 0
    }, 300, function () {
        $('#cover-pos').hide();
        startGame();
    });
}

$(document).ready(function () {
    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
            setTile(new Vector2(i, j), cell.blank);
        }
    }
    drawSnake();
    drawGame();
    $('#fade-circle-3').animate({
        width: '0px',
        height: '0px'
    }, 1500);
    setTimeout(function () {
        $('#fade-circle-2').animate({
            width: '0px',
            height: '0px'
        }, 1500);
    }, 100);
    setTimeout(function () {
        $('#fade-circle-1').animate({
            width: '0px',
            height: '0px'
        }, 1500);
    }, 200);
    $('body').on('keydown', function (event) {
        for (let key in arrow) {
            if (arrow[key] === event.keyCode) {
                input[input.length] = event.keyCode;
                return;
            }
        }
    });
});