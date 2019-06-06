window.onload = () => {
  const canvas = document.getElementById("gameCanvas");
  const canvasContext = canvas.getContext("2d");

  const board = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    color: "#000"
  };

  const apple = {
    x: 395,
    y: 295,
    width: 10,
    height: 10,
    color: "#ff0000",
    xVel: 5,
    yVel: 5
  };

  const snake = {
    x: 395,
    y: 295,
    width: 10,
    height: 10,
    color: "#00ff00",
    xVel: 5,
    yVel: 5
  };

  const game = {
    on: false,
    speed: 50,
    action: null
  };

  function drawRect(leftX, topY, width, height, objColor) {
    canvasContext.fillStyle = objColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }

  function init() {
    drawRect(board.x, board.y, board.width, board.height, board.color);
    // drawRect(snake.x, snake.y, snake.width, snake.height, snake.color);
    startText();
  }

  document.addEventListener("keydown", e => {
    if (event.which === 32) {
      game.on = !game.on;
    }
    if (game.on) {
      game.action = setInterval(() => {
        // draw the game board
        drawRect(board.x, board.y, board.width, board.height, board.color);

        snakeMove();
      }, game.speed);
    } else {
      clearInterval(game.action);
    }
  });

  function snakeMove() {
    if (snake.x >= board.width - 10 || snake.x <= 0) {
      snake.xVel = -snake.xVel;
    }

    if (snake.y >= board.height - 10 || snake.y <= 0) {
      snake.yVel = -snake.yVel;
    }

    snake.y += snake.yVel;
    snake.x += snake.xVel;
    drawRect(snake.x, snake.y, snake.width, snake.height, snake.color);
  }

  function startText() {
    canvasContext.font = "24px Roboto Mono";
    canvasContext.fillStyle = "#f5f5f6";
    canvasContext.textAlign = "center";
    canvasContext.fillText(
      "Click Start button to begin",
      board.width / 2,
      board.height / 2
    );
  }

  init();
};

