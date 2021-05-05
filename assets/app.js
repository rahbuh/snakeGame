window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 288;
  canvas.height = 192;
  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;

  const score = document.querySelector("#score");
  const level = document.querySelector("#level");
  const upButton = document.querySelector("#btn-up");
  const leftButton = document.querySelector("#btn-left");
  const rightButton = document.querySelector("#btn-right");
  const downButton = document.querySelector("#btn-down");
  const start = document.querySelector("#btn-start");
  const info = document.querySelector("#btn-info");
  const speed = document.querySelector("#btn-speed");
  
  // const speedControls = document.getElementsByName("speed");
  // const openInfo = document.getElementById("open-info");
  // const closeInfo = document.getElementById("close-info");

  const DIRECTION = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
    UP: "UP",
    DOWN: "DOWN",
  };

  const snake = {
    body: [],
    segmentSize: 8,
    color: "#000",
    direction: "UP",
    addSegment: false,
  };

  const apple = {
    x: 0,
    y: 0,
    size: 8,
    color: "#000",
    eaten: true,
  };

  const game = {
    on: false,
    score: 0,
    speed: 180,
    action: null,
  };

  // openInfo.addEventListener("click", (e) => {
  //   document.getElementById("instructions").style.display = "grid";
  //   document.getElementById("board").style.display = "none";
  // });

  // closeInfo.addEventListener("click", (e) => {
  //   document.getElementById("instructions").style.display = "none";
  //   document.getElementById("board").style.display = "block";
  // });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && snake.direction !== DIRECTION.RIGHT) {
      snake.direction = DIRECTION.LEFT;
    }
    if (e.key === "ArrowRight" && snake.direction !== DIRECTION.LEFT) {
      snake.direction = DIRECTION.RIGHT;
    }
    if (e.key === "ArrowUp" && snake.direction !== DIRECTION.DOWN) {
      snake.direction = DIRECTION.UP;
    }
    if (e.key === "ArrowDown" && snake.direction !== DIRECTION.UP) {
      snake.direction = DIRECTION.DOWN;
    }
    if (e.key === "Enter") {
      score.childNodes[1].innerText = game.score;
      !game.on && app.runGame();111111
    }
    if (e.key === "1") {
      app.setSpeed(level.innerText);
    }
  });

  start.addEventListener("click", () => {
    score.childNodes[1].innerText = game.score;
    !game.on && app.runGame();
  });

  leftButton.addEventListener("click", () => {
    if (game.on && snake.direction !== DIRECTION.RIGHT) {
      snake.direction = DIRECTION.LEFT;
    }
  });

  rightButton.addEventListener("click", () => {
    if (game.on && snake.direction !== DIRECTION.LEFT) {
      snake.direction = DIRECTION.RIGHT;
    }
  });

  upButton.addEventListener("click", () => {
    if (game.on && snake.direction !== DIRECTION.DOWN) {
      snake.direction = DIRECTION.UP;
    }
  });

  downButton.addEventListener("click", () => {
    if (game.on && snake.direction !== DIRECTION.UP) {
      snake.direction = DIRECTION.DOWN;
    }
  });

  speed.addEventListener("click", () => {
    app.setSpeed(level.innerText);
  });

  const app = {
    init: function () {
      this.showText("PRESS # TO START GAME");
      this.createNewSnake();
    },

    resetGame: function () {
      game.on = !game.on;
      game.score = 0;
      apple.eaten = !apple.eaten;
      snake.direction = DIRECTION.UP;
      this.createNewSnake();
    },

    showText: function (message) {
      ctx.font = "24px VT323";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(message, xCenter, yCenter);
    },

    createNewSnake: function () {
      snake.body.length = 0;
      for (let i = 0; i < 5; i++) {
        snake.body.push({ x: xCenter, y: yCenter + snake.segmentSize * i });
      }
    },

    drawRect: function (x, y, width, height, color) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
      ctx.closePath();
    },

    randomLocation: function (measure) {
      return (
        Math.round(
          Math.floor(Math.random() * (measure - apple.size)) / apple.size
        ) * apple.size
      );
    },

    setNewAppleCoordinates: function () {
      apple.x = this.randomLocation(canvas.width);
      apple.y = this.randomLocation(canvas.height);
    },

    createNewApple: function () {
      this.setNewAppleCoordinates();
      this.drawRect(apple.x, apple.y, apple.size, apple.size, apple.color);
      apple.eaten = !apple.eaten;
    },

    drawSnake: function () {
      snake.body.forEach((section) => {
        this.drawRect(
          section.x,
          section.y,
          snake.segmentSize,
          snake.segmentSize,
          snake.color
        );
      });
    },

    setSpeed (text) {
      switch (text) {
        case "LEVEL: SLOW":
          level.innerText = "LEVEL: MED";
          break;
        case "LEVEL: MED":
          level.innerText = "LEVEL: FAST";
          break;
        case "LEVEL: FAST":
          level.innerText = "LEVEL: SLOW";
          break;
        default:
          level.innerText = "LEVEL: SLOW";
          break;
      }
    },

    moveSnake: function () {
      let nextX = snake.body[0].x;
      let nextY = snake.body[0].y;

      switch (snake.direction) {
        case "LEFT":
          nextX -= snake.segmentSize;
          break;
        case "RIGHT":
          nextX += snake.segmentSize;
          break;
        case "UP":
          nextY -= snake.segmentSize;
          break;
        case "DOWN":
          nextY += snake.segmentSize;
          break;
        default:
          throw new Error("invalid snake direction");
      }

      snake.body.unshift({ x: nextX, y: nextY });
      if (!snake.addSegment) {
        let segmentToRemove = snake.body.pop();
        ctx.clearRect(
          segmentToRemove.x,
          segmentToRemove.y,
          snake.segmentSize,
          snake.segmentSize
        );
      } else {
        snake.addSegment = !snake.addSegment;
      }
      this.drawSnake();
      this.detectAppleEaten();
      this.detectEdgeCollision();
      this.detectSnakeCollisionWithSelf();
    },

    detectEdgeCollision: function () {
      const isTouchingRightOrLeftEdge =
        snake.body[0].x > canvas.width - snake.segmentSize ||
        snake.body[0].x < 0;

      const isTouchingTopOrBottomEdge =
        snake.body[0].y > canvas.height - snake.segmentSize ||
        snake.body[0].y < 0;

      (isTouchingRightOrLeftEdge || isTouchingTopOrBottomEdge) &&
        this.endGame();
    },

    detectAppleEaten: function () {
      const isAppleEaten =
        snake.body[0].x < apple.x + apple.size &&
        snake.body[0].x + snake.segmentSize > apple.x &&
        snake.body[0].y < apple.y + apple.size &&
        snake.body[0].y + snake.segmentSize > apple.y;

      if (isAppleEaten) {
        apple.eaten = !apple.eaten;
        snake.addSegment = !snake.addSegment;
        this.updateScore();
      }
    },

    detectSnakeCollisionWithSelf: function () {
      for (let i = 1; i < snake.body.length; i++) {
        snake.body[0].x === snake.body[i].x &&
          snake.body[0].y === snake.body[i].y &&
          this.endGame();
      }
    },

    runGame: function () {
      game.on = !game.on;
      this.disableSpeedControls(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawSnake();
      game.action = setInterval(() => {
        apple.eaten && this.createNewApple();
        this.moveSnake();
        this.drawRect(apple.x, apple.y, apple.size, apple.size, apple.color);
      }, game.speed);
    },

    disableSpeedControls: function (status) {
      const radioNodes = document.querySelectorAll('[type = "radio"]');

      status
        ? radioNodes.forEach((radio) => radio.setAttribute("disabled", true))
        : radioNodes.forEach((radio) => radio.removeAttribute("disabled"));
    },

    endGame: function () {
      clearInterval(game.action);
      this.showText("GAME OVER");
      this.disableSpeedControls(false);
      this.resetGame();
    },

    updateScore: function () {
      game.score += 1;
      score.childNodes[1].innerText = game.score;
    },
  };

  app.init();
};
