const FPS = 16.8; // 60-63 FPS

function start(){
  console.log("START");
}

function draw(){
  const date = new Date();
  console.log(date.getSeconds(), "DRAW");
}

document.addEventListener("DOMContentLoaded", () => {
  start();

  setInterval(() => {
    draw();
  }, FPS);
});
