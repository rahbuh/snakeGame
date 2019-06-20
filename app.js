window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector("#start");

  canvas.width = 800;
  canvas.height = 600;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;

  const snake = [];
  const segment = 8;
  let xDir;
  let yDir;

  const game = {
    on: false,
    speed: 50,
    action: null
  };

  function init() {
    showText("Click Start button to begin");
    createNewSnake();

    console.log(snake);
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
      snake.push({ x: xCenter, y: yCenter + segment * i });
    }
  }

  function drawSnake() {
    snake.forEach((section) => {
      ctx.beginPath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(section.x, section.y, segment, segment);
      ctx.closePath();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") {
      console.log("left arrow");
    }
    if (e.key === "ArrowUp") {
      console.log("up arrow");
    }
    if (e.key === "ArrowRight") {
      console.log("right arrow");
    }
    if (e.key === "ArrowDown") {
      console.log("down arrow");
    }
  });

  startButton.addEventListener("click", e => {
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    console.log("button clicked");
  });

  init();
};
