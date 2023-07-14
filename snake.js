let blockSize = 25;
let rows = 20;
let cols = 20;
let snakeX = 5 * blockSize;
let snakeY = 5 * blockSize;
let speedX = 1;
let speedY = 0;
let gameOver = false;
let isStart = true;
let points = 0;
let snakeBody = [
  [snakeX - blockSize, snakeY],
  [snakeX - 2 * blockSize, snakeY],
  [snakeX -3*blockSize,snakeY],
  [snakeX -4*blockSize,snakeY]
];
let board, ctx;

window.addEventListener("load", () => {
  board = document.getElementById("board");
  board.width = cols * blockSize;
  board.height = rows * blockSize;
  ctx = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(() => {
    update();
  }, 150);
});

let update = () => {
  if (gameOver) {
    return;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, board.width, board.height);
  ctx.fillStyle = "green";
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
   
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(foodX, foodY, blockSize, blockSize);

  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    let score = document.getElementById("score");
    points += 5
    score.innerText = `Score : ${points}`
    placeFood();
  }
  if (
    snakeX < 0||
    snakeX > (cols * blockSize) -1 ||
    snakeY < 0||
    snakeY > (rows * blockSize - 1)
  ) {
    gameOver = true;
    ctx.fillStyle ="red"
    ctx.font = "48px serif";
    ctx.fillText('Game Over', board.width/3.3,board.height/2)
    
    
  }
 for(let i =1 ; i<snakeBody.length-1;i++){
    if(snakeX== snakeBody[i][0] && snakeY== snakeBody[i][1]){
        gameOver = true;
        ctx.fillStyle ="red"
    ctx.font = "48px serif";
    ctx.fillText('Game Over', board.width/3.3,board.height/2)
    }
 }
  if (isStart) {
    snakeBody[0] = [snakeX, snakeY];
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
  }
};

function changeDirection(event) {
  isStart = true;

  if (event.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  }
  else if (event.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
  else if (event.code == "ArrowUp" && speedY != 1) {
    speedY = -1;
    speedX = 0;
  }
  else if (event.code == "ArrowDown" && speedY != -1) {
    speedY = 1;
    speedX = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
