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
    drawRect(apple.x, apple.y, apple.width, apple.height, apple.color);
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
    if (apple.x >= board.width - 10 || apple.x <= 0) {
      apple.xVel = -apple.xVel;
    }

    if (apple.y >= board.height - 10 || apple.y <= 0) {
      apple.yVel = -apple.yVel;
    }

    apple.y += apple.yVel;
    apple.x += apple.xVel;
    drawRect(apple.x, apple.y, apple.width, apple.height, apple.color);
  }

  init();
};
