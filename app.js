window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  
  canvas.width = 480;
  canvas.height = 320;
  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;

  const snake = {
    body: [],
    segmentSize: 8,
    color: "#00cc00",
    xDir: 0,
    yDir: -8,
    addLink: false
  };

  const apple = {
    x: 0,
    y: 0,
    size: 8,
    color: "#ff0000",
    eaten: true
  };

  const game = {
    on: false,
    score: 0,
    speed: 130,
    action: null
  };

  const startButton = document.querySelector("#start");
  const score = document.querySelector("#score");

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && snake.yDir !== 0) {
      snake.xDir = -snake.segmentSize;
      snake.yDir = 0;
    }
    if (e.key === "ArrowRight" && snake.yDir !== 0) {
      snake.xDir = snake.segmentSize;
      snake.yDir = 0;
    }
    if (e.key === "ArrowUp" && snake.xDir !== 0) {
      snake.xDir = 0;
      snake.yDir = -snake.segmentSize;
    }
    if (e.key === "ArrowDown" && snake.xDir !== 0) {
      snake.xDir = 0;
      snake.yDir = snake.segmentSize;
    }
  });

  startButton.addEventListener("click", e => {
    e.preventDefault();
    score.childNodes[1].innerText = game.score;
    if (!game.on) {
      app.runGame();
    }
  });

  const app = {
    init: function() {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.showText("Click Start button to begin");
      this.createNewSnake();
    },

    resetGame: function() {
      game.on = !game.on;
      game.score = 0;
      apple.eaten = !apple.eaten;
      snake.xDir = 0;
      snake.yDir = -8;
      this.createNewSnake();
    },

    showText: function(message) {
      ctx.font = "20px Roboto Mono";
      ctx.fillStyle = "#f5f5f6";
      ctx.textAlign = "center";
      ctx.fillText(message, xCenter, yCenter);
    },

    createNewSnake: function() {
      snake.body.length = 0;
      for (let i = 0; i < 5; i++) {
        snake.body.push({ x: xCenter, y: yCenter + snake.segmentSize * i });
      }
    },

    drawRect: function(x, y, width, height, color) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
      ctx.closePath();
    },

    randomLocation: function(measure) {
      return (
        Math.round(
          Math.floor(Math.random() * (measure - apple.size)) / apple.size
        ) * apple.size
      );
    },

    showApple: function() {
      apple.x = this.randomLocation(canvas.width);
      apple.y = this.randomLocation(canvas.height);
      this.drawRect(apple.x, apple.y, apple.size, apple.size, apple.color);
      apple.eaten = !apple.eaten;
    },

    drawSnake: function() {
      snake.body.forEach(section => {
        this.drawRect(
          section.x,
          section.y,
          snake.segmentSize,
          snake.segmentSize,
          snake.color
        );
      });
    },
    
    moveSnake: function() {
      let nextX = snake.body[0].x + snake.xDir;
      let nextY = snake.body[0].y + snake.yDir;

      snake.body.unshift({ x: nextX, y: nextY });
      if (!snake.addLink) {
        let segmentToRemove = snake.body.pop();
        ctx.clearRect(
          segmentToRemove.x,
          segmentToRemove.y,
          snake.segmentSize,
          snake.segmentSize
        );
      } else {
        snake.addLink = !snake.addLink;
      }
      this.drawSnake();
      this.assessSnakeLocation();
    },

    assessSnakeLocation: function() {
      if (
        snake.body[0].x > canvas.width - snake.segmentSize ||
        snake.body[0].x < 0
      ) {
        this.endGame();
      }
      if (
        snake.body[0].y > canvas.height - snake.segmentSize ||
        snake.body[0].y < 0
      ) {
        this.endGame();
      }
      if (
        snake.body[0].x < apple.x + apple.size &&
        snake.body[0].x + snake.segmentSize > apple.x &&
        snake.body[0].y < apple.y + apple.size &&
        snake.body[0].y + snake.segmentSize > apple.y
      ) {
        apple.eaten = !apple.eaten;
        snake.addLink = !snake.addLink;
        this.updateScore();
      }
      for (let i = 1; i < snake.body.length; i++) {
        if (
          snake.body[0].x === snake.body[i].x &&
          snake.body[0].y === snake.body[i].y
        ) {
          this.endGame();
        }
      }
    },

    runGame: function() {
      game.on = !game.on;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawSnake();
      game.action = setInterval(() => {
        if (apple.eaten) {
          this.showApple();
        }
        this.moveSnake();
      }, game.speed);
    },

    endGame: function() {
      clearInterval(game.action);
      this.showText("Game Over");
      this.resetGame();
    },

    updateScore: function() {
      game.score += 1;
      score.childNodes[1].innerText = game.score;
    }
  };

  app.init();
};
