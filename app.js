window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector("#start");
  const score = document.querySelector("#score");

  canvas.width = 800;
  canvas.height = 600;
  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;

  const snake = [];
  const segmentSize = 8;
  let xDir = 0;
  let yDir = -segmentSize;

  const apple = {
    size: 8,
    color: "#ff0000",
    eaten: true
  };

  const game = {
    on: false,
    score: 0,
    speed: 200,
    action: null
  };

  function init() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    showText("Click Start button to begin");
    createNewSnake();
  }

  function showText(message) {
    ctx.font = "24px Roboto Mono";
    ctx.fillStyle = "#f5f5f6";
    ctx.textAlign = "center";
    ctx.fillText(message, xCenter, yCenter);
  }

  function createNewSnake() {
    snake.length = 0;
    for (let i = 0; i < 3; i++) {
      snake.push({ x: xCenter, y: yCenter + segmentSize * i });
    }
  }

  function displayApple() {}

  function runGame() {
    game.on = !game.on;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayApple();
    drawSnake();
    game.action = setInterval(() => {
      moveSnake();
    }, game.speed);
  }

  function moveSnake() {
    let nextX = snake[0].x + xDir;
    let nextY = snake[0].y + yDir;

    snake.unshift({ x: nextX, y: nextY });
    let segmentToRemove = snake.pop();
    
    drawSnake();
    ctx.clearRect(segmentToRemove.x,segmentToRemove.y,segmentSize,segmentSize);
  }

  function drawSnake() {
    snake.forEach(section => {
      ctx.beginPath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(section.x, section.y, segmentSize, segmentSize);
      ctx.closePath();
    });
  }

  function updateScore() {
    game.score += 1;
    score.childNodes[1].innerText = game.score;
  }

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && yDir !== 0) {
      xDir = -segmentSize;
      yDir = 0;
    }
    if (e.key === "ArrowRight" && yDir !== 0) {
      xDir = segmentSize;
      yDir = 0;
    }
    if (e.key === "ArrowUp" && xDir !== 0) {
      xDir = 0;
      yDir = -segmentSize;
    }
    if (e.key === "ArrowDown" && xDir !== 0) {
      xDir = 0;
      yDir = segmentSize;
    }
  });

  startButton.addEventListener("click", e => {
    e.preventDefault();
    if (!game.on) {
      runGame();
    }
  });

  init();
};
