window.onload = () => {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");
  const startButton = document.querySelector("#start");

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// context.strokeStyle = "#000";
// context.stroke();

  const board = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    color: "#000"
  };

  const apple = {
    x: 15,
    y: 15,
    radius: 5,
    color: "#ff0000",
    eaten: true
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

  // const body = [
  //   {
  //     width: 10,
  //     height: 10,
  //     color: "#00ff00",
  //     moves: {
  //       xLoc: 0,
  //       yLoc: 0
  //     }
  //   }
  // ];

  // body[0].color;

  const game = {
    on: false,
    speed: 50,
    action: null
  };

  function drawRect(rectObjToDraw) {
    canvasContext.fillStyle = rectObjToDraw.color;
    canvasContext.fillRect(
      rectObjToDraw.x,
      rectObjToDraw.y,
      rectObjToDraw.width,
      rectObjToDraw.height
    );
  }

  function drawCircle(circObjToDraw) {
    canvasContext.beginPath();
    canvasContext.arc(
      circObjToDraw.x,
      circObjToDraw.y,
      circObjToDraw.radius,
      0,
      2 * Math.PI
    );
    canvasContext.fillStyle = circObjToDraw.color;
    canvasContext.fill();
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

  function runGame() {
    game.on = !game.on;
    game.action = setInterval(() => {
      drawRect(board);
      showApple();
      moveSnake();
    }, game.speed);
  }

  // console.log('x: ', snake.x, ' y: ',snake.y);
  function getDistance(snakeX, snakeY, appleX, appleY) {
    let xDistance = appleX - snakeX;
    let yDistance = appleY - snakeY;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  function showApple() {
    if (apple.eaten) {
      apple.x = Math.floor(Math.random() * (board.width - 20)) + 10;
      apple.y = Math.floor(Math.random() * (board.width - 20)) + 10;
      apple.eaten = !apple.eaten;
    }
    drawCircle(apple);
  }

  function moveSnake() {
    if (snake.x >= board.width - snake.width || snake.x <= 0) {
      endGame();
    }
    if (snake.y >= board.height - snake.height || snake.y <= 0) {
      endGame();
    }

    snake.y += snake.moves.yVel;
    snake.x += snake.moves.xVel;
    drawRect(snake);
    if (getDistance(snake.x, snake.y, apple.x, apple.y) < apple.radius) {
      console.log("Collision");
      // apple.eaten = !apple.eaten;
    }
  }

  function showText(message) {
    canvasContext.font = "24px Roboto Mono";
    canvasContext.fillStyle = "#f5f5f6";
    canvasContext.textAlign = "center";
    canvasContext.fillText(message, board.width / 2, board.height / 2);
  }

  function endGame() {
    game.on = !game.on;
    apple.eaten = !apple.eaten;
    clearInterval(game.action);
    showText("Game Over");
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
    if (!game.on) {
      setSnakePosition();
      runGame();
    }
  });

  init();
};
