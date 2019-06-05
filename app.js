window.onload = () => {
  console.log("Window loaded");

  const canvas = document.getElementById("gameCanvas");
  const canvasContext = canvas.getContext("2d");

  let xLoc = 100;
  let gameSpeed = 10;

  setInterval(() => {
    // draw the game board
    drawRect(0, 0, canvas.width, canvas.height, "black");
    
    drawRect(xLoc, 100, 10, 10, "red");
    xLoc += 5;
  }, 10);

  function drawRect(leftX, topY, width, height, objColor) {
    canvasContext.fillStyle = objColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }
};
