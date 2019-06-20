window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector("#start");

  canvas.width = 800;
  canvas.height = 600;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const snake = [];

  const game = {
    on: false,
    speed: 50,
    action: null
  };

  function init() {
    showText("Click Start button to begin");
    snake.length = 0;
  }

  function showText(message) {
    ctx.font = "24px Roboto Mono";
    ctx.fillStyle = "#f5f5f6";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
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
    console.log("button clicked");
  });

  init();
};
