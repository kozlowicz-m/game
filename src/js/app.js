const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

let sizeBlock = 10;
let width = 20;
let height = 20;
let widthBlock = width / sizeBlock;
let heightBlock = height / sizeBlock;
let score = 0;

let printBorder = function () {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, sizeBlock);
    context.fillRect(0, height - sizeBlock, width, sizeBlock);
    context.fillRect(0, 0, sizeBlock, height);
    context.fillRect(width - sizeBlock, 0, sizeBlock, width);
};


class Block {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
}

Block.prototype.printSquare = function (color) {
    let x = this.col / sizeBlock;
    let y = this.row / sizeBlock;
    context.fillStyle = color;
    context.fillRect(x, y, sizeBlock, sizeBlock);
}

Block.prototype.compare = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row
}

class Snake {
    constructor() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5)
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
    }
}

Snake.prototype.move = function () {
    let head = this.segments[0];
    let newHead;

    this.direction = this.nextDirection;

    if (this.direction === 'right') {
        newHead = new Block(head.col + 1, head.row);
    } else if (direction === 'left') {
        newHead = new Block(head.col - 1, head.row);
    } else if (direction === 'up') {
        newHead = new Block(head.col, head.row - 1);
    } else if (direction === 'down') {
        newHead = new Block(head.col, head.row + 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.compare(apple.position)) {
        score++
        apple.move();
    } else {
        this.segments.pop()
    }
};

Snake.prototype.checkCollision = function (head) {

}

class Apple {
    constructor() {
        this.canvas = canvas;
        this.context = context;
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);

    }
}


class Game {
    constructor() {
        this.board = document.querySelectorAll('board');
        this.snake = new Snake();
        this.apple = new Apple();
        this.score = 0;
        let self = this;
        this.index = function (x, y) {
            return x + (y * 10);
        };

        this.showSnake = function showSnake() {
            this.hideVisibleSnake();
            //this.board[this.index(this.snake.x, this.snake.y)].classList.add('snake');
        };

        this.showCoin = function showCoin() {
            // this.board[this.index(this.apple.x, this.apple.y)].classList.add('apple');
        };

        this.startGame = function startGame() {
            this.idInterval = setInterval(function () {
                self.moveSnake();
            }, 250);
        };

        this.moveSnake = function moveSnake() {
            if (this.snake.direction === 'right') {
                this.snake.x = this.snake.x + 1;
            } else if (this.snake.direction === 'left') {
                this.snake.x = this.snake.x - 1;
            } else if (this.snake.direction === 'down') {
                this.snake.y = this.snake.y + 1;
            } else if (this.snake.direction === 'up') {
                this.snake.y = this.snake.y - 1;
            }

            this.checkAppleCollision();
            let bool = this.gameOver();
            if (!bool) {
                this.showSnake();
                this.showApple();
            }
        };
        this.checkAppleCollision = function checkAppleCollision() {
            if (this.snake.x == this.apple.x && this.snake.y == this.apple.y) {
                let apple = document.querySelector('.apple');
                apple.classList.remove('apple');
                snake.classList.add('snake') //powiekszenie snake
                this.score++;
                this.apple = new Apple();
                this.showApple();
                this.updateScore(this.score);
            }
        };

        this.checkCollision = function checkCollision() {

        }

        this.gameOver = function gameOver() {
            if (this.snake.x < 0 || this.snake.x > 9 || this.snake.y < 0 || this.snake.y > 9) {
                clearInterval(this.idInterval);
                alert('KONIEC GRY');
                return true;
            }
        };

        this.hideVisibleSnake = function hideVisibleSnake() {
            let hide = document.querySelector('.snake');
            if (hide != null) {
                hide.classList.remove('snake');
            }
        };
        this.turnSnake = function turnSnake(event) {
            switch (event.which) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'up';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'down';
                    break;
            }
        };
        this.updateScore = function updateScore(points) {
            let score = document.querySelector('score__info');
            score.innerText = points;
        };
    }
}

document.addEventListener('keydown', function (event) {
    play.turnSnake(event);
});

let play = new Game();
// play.showSnake();
// play.startGame();
printBorder();