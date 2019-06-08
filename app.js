window.onload = () => {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");
  const startButton = document.querySelector("#start");

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
    color: "#ff0000"
  };

  const snake = {
    x: board.width / 2,
    y: board.width / 2,
    width: 10,
    height: 10,
    color: "#00ff00",
    moves: {
      xVel: 0,
      yVel: 0
    }
  };

  const game = {
    on: false,
    speed: 50,
    action: null
  };

  function drawRect(objToDraw) {
    canvasContext.fillStyle = objToDraw.color;
    canvasContext.fillRect(
      objToDraw.x,
      objToDraw.y,
      objToDraw.width,
      objToDraw.height
    );
  }

  function init() {
    drawRect(board);
    showText("Click Start button to begin");
  }

  function setSnakePosition() {
    snake.x = board.width / 2;
    snake.y = board.height / 2;
    snake.moves.xVel = 0;
    snake.moves.yVel = -5;
  }

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && snake.moves.yVel !== 0) {
      snake.moves.xVel = -5;
      snake.moves.yVel = 0;
    }
    if (e.key === "ArrowUp" && snake.moves.xVel !== 0) {
      snake.moves.xVel = 0;
      snake.moves.yVel = -5;
    }
    if (e.key === "ArrowRight" && snake.moves.yVel !== 0) {
      snake.moves.xVel = 5;
      snake.moves.yVel = 0;
    }
    if (e.key === "ArrowDown" && snake.moves.xVel !== 0) {
      snake.moves.xVel = 0;
      snake.moves.yVel = 5;
    }
  });

  startButton.addEventListener("click", e => {
    e.preventDefault();
    // console.log(Math.floor(Math.random() * board.width))
    if (!game.on) {
      setSnakePosition();
      runGame();
    }
  });

  function runGame() {
    game.on = !game.on;
    game.action = setInterval(() => {
      drawRect(board);
      snakeMove();
    }, game.speed);
  }

  function endGame() {
    game.on = !game.on;
    clearInterval(game.action);
    showText("Game Over");
  }

  function snakeMove() {
    if (snake.x >= board.width - snake.width || snake.x <= 0) {
      endGame();
    }
    if (snake.y >= board.height - snake.height || snake.y <= 0) {
      endGame();
    }

    snake.y += snake.moves.yVel;
    snake.x += snake.moves.xVel;
    drawRect(snake);
  }

  function showText(message) {
    canvasContext.font = "24px Roboto Mono";
    canvasContext.fillStyle = "#f5f5f6";
    canvasContext.textAlign = "center";
    canvasContext.fillText(message, board.width / 2, board.height / 2);
  }

  init();
};
