const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./assets/flappy-bee-set.png";

//settings

let gameplaying = false;
const gravity = 0.5,
  speed = 6.2,
  size = [91, 89],
  jump = -10,
  canvasTenth = canvas.width / 10;

let i = 0,
  bestScore = 0,
  currentScore = 0,
  pipes = [],
  flight,
  flyHeight;

const render = () => {
  i++;

  //background animation
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((i * (speed / 4)) % canvas.width) + canvas.width,
    0,
    canvas.width,
    canvas.height
  );
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((i * (speed / 4)) % canvas.width),
    0,
    canvas.width,
    canvas.height
  );

  //bee animation
  ctx.drawImage(
    img,
    432,
    Math.floor((i % 6) / 3) * size[1],
    ...size,
    canvas.width / 2 - size[0] / 2,
    flyHeight,
    ...size
  );
  flyHeight = canvas.height / 2 - size[1] / 2;
  let modulo = Math.floor((i % 3) / 9);
  //   console.log(modulo);

  ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
  ctx.font = "bold 30px courier";

  window.requestAnimationFrame(render);
};

img.onload = render;
