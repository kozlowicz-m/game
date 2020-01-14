const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let sizeBlock = 10;

let width = canvas.width;
let height = canvas.height;
let widthBlock = width / sizeBlock;
let heightBlock = height / sizeBlock;
let score = 0;

let printBorder = function() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, sizeBlock);
  ctx.fillRect(0, height - sizeBlock, width, sizeBlock);
  ctx.fillRect(0, 0, sizeBlock, height);
  ctx.fillRect(width - sizeBlock, 0, sizeBlock, width);
};

let circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

let gameOver = function() {
  clearTimeout(id);
  ctx.font = '32px Courier';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', width / 2, height / 2);
};

let Block = function(col, row) {
  this.col = col;
  this.row = row;
};

Block.prototype.printSquare = function(color) {
  let x = this.col * sizeBlock;
  let y = this.row * sizeBlock;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, sizeBlock, sizeBlock);
};

Block.prototype.printCircle = function(color) {
  let centerX = this.col * sizeBlock + sizeBlock / 2;
  let centerY = this.row * sizeBlock + sizeBlock / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, sizeBlock / 2, true);
};

Block.prototype.compare = function(otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

class Snake {
  constructor() {
    this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = 'right';
    this.nextDirection = 'right';
  }
}

Snake.prototype.print = function() {
  for (let i = 0; i < this.segments.length; i++) {
    this.segments[i].printSquare('black');
  }
};

Snake.prototype.move = function() {
  let head = this.segments[0];
  let newHead;

  this.direction = this.nextDirection;

  if (this.direction === 'right') {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === 'left') {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === 'up') {
    newHead = new Block(head.col, head.row - 1);
  } else if (this.direction === 'down') {
    newHead = new Block(head.col, head.row + 1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.compare(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
};

Snake.prototype.checkCollision = function(head) {
  let leftCollision = (head.col === 0);
  let rightCollision = (head.col === widthBlock - 1);
  let topCollision = (head.row === 0);
  let bottomCollision = (head.row === heightBlock - 1);

  let wallCollision =
    leftCollision || rightCollision || topCollision || bottomCollision;

  let tailCollision = false;

  for (let i = 0; i < this.segments.length; i++) {
    if (head.compare(this.segments[i])) {
      tailCollision = true;
    }
  }
  return wallCollision || tailCollision;
};

Snake.prototype.setDirection = function(newDirection) {
  if (this.direction === 'top' && newDirection === 'bottom') {
    return;
  } else if (this.direction === 'right' && newDirection === 'left') {
    return;
  } else if (this.direction === 'left' && newDirection === 'right') {
    return;
  } else if (this.direction === 'bottom' && newDirection === 'top') {
    return;
  }
  this.nextDirection = newDirection;
};

let Apple = function(){
  this.position = new Block(10,10)
};

Apple.prototype.print = function() {
  this.position.printCircle('green');
};

Apple.prototype.move = function(occupiedSegments) {
  let randomCol = Math.floor(Math.random() * (widthBlock - 2)) + 1;
  let randomRow = Math.floor(Math.random() * (heightBlock - 2)) + 1;
  this.position = new Block(randomCol, randomRow);

  for (let i = 0; i < occupiedSegments.length; i++) {
    if (this.position.compare(occupiedSegments)) {
      this.move(occupiedSegments);
      return;
    }
  }
};

let snake = new Snake();
let apple = new Apple();

let id = setInterval(function() {
  ctx.clearRect(0, 0, width, height);
  snake.move();
  snake.print();
  apple.print();
  printBorder();
}, 100);


let direction = {
  37: 'left',
  38: 'top',
  39: 'right',
  40: 'bottom'
};


document.addEventListener('keydown', function (event) {
  play.direction(event)
});

let play = new Snake();
//play.snake();
