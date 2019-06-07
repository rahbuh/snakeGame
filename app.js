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

  startButton.addEventListener("click", e => {
    e.preventDefault();
    if (!game.on) {
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

  // document.addEventListener("keydown", e => {
  //   if (event.which === 32) {
  //     game.on = !game.on;
  //   }
  //   if (game.on) {
  //
  //   } else {
  //     clearInterval(game.action);
  //   }
  // });

  function snakeMove() {
    if (snake.x >= board.width - 10 || snake.x <= 0) {
      snake.xVel = -snake.xVel;
    }

    if (snake.y >= board.height - 10 || snake.y <= 0) {
      snake.yVel = -snake.yVel;
    }

    snake.y += snake.yVel;
    snake.x += snake.xVel;
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
