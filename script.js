const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./assets/flappy-bee-set.png";

//settings

let gameplaying = false;
let turbo = false;
let speed;
const gravity = 0.1,
  size = [91, 89],
  jump = -3,
  canvasTenth = canvas.width / 10;

//plant settings

const plantwidth = 147;
let plantGap = 270;
const plantLocation = () =>
  Math.random() * (canvas.height - (plantGap + plantwidth) - plantwidth) +
  plantwidth;

let i = 0,
  bestScore = 0,
  currentScore = 0,
  plants = [],
  flight,
  flyHeight;

//setup settings

const setup = () => {
  currentScore = 0;
  flight = jump;
  flyHeight = canvas.height / 2 - size[1];

  plants = Array(3)
    .fill()
    .map((a, b) => [
      canvas.width + b * (plantGap + plantwidth),
      plantLocation(),
    ]);
  console.log(plants);
};

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

  //behavior if click
  //bee animation
  if (gameplaying) {
    speed = 4.2;
    ctx.drawImage(
      img,
      433,
      Math.floor((i % 9) / 3) * size[1],
      ...size,
      canvasTenth,
      flyHeight,
      ...size
    );
    flight += gravity;

    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    if (turbo) {
      speed = 30;
    } else {
      speed = 6.2;
    }
    ctx.drawImage(
      img,
      433,
      Math.floor((i % 6) / 3) * size[1],
      ...size,
      canvas.width / 2 - size[0] / 2,
      flyHeight,
      ...size
    );
    flyHeight = canvas.height / 2 - size[1] / 2;

    ctx.fillText(`Beest score : ${bestScore}`, 75, 245);
    ctx.fillText(`Clic to play`, 100, 535);
    ctx.font = "bold 30px courier";
  }

  //plant display
  if (gameplaying) {
    plants.map((plant) => {
      plant[0] -= speed;

      // top plant
      ctx.drawImage(
        img,
        726,
        768 - plant[1],
        plantwidth,
        plant[1],
        plant[0],
        0,
        plantwidth,
        plant[1]
      );

      //bottom plant
      ctx.drawImage(
        img,
        432,
        323,
        plantwidth,
        canvas.height - plant[1] + plantGap,
        plant[0],
        plant[1] + plantGap,
        plantwidth,
        canvas.height - plant[1] + plantGap
      );

      // update the best score
      if (plant[0] <= -plantwidth) {
        currentScore++;
        bestScore = Math.max(bestScore, currentScore);

        // remove plants and create new one
        plants = [
          ...plants.slice(1),
          [
            plants[plants.length - 1][0] + plantGap + plantwidth,
            plantLocation(),
          ],
        ];
        console.log(plants);
        console.log(bestScore);
      }

      // if the bee hit a plant, the game over
      if (
        [
          plant[0] <= canvasTenth,
          plant[0] + plantwidth >= canvasTenth,
          plant[1] > flyHeight || plant[1] + plantGap < flyHeight + size[1],
        ].every((elt) => elt)
      ) {
        gameplaying = false;
        setup();
      }
    });
  }

  document.getElementById(
    "best-score"
  ).innerHTML = `Beest Score : ${bestScore}`;
  document.getElementById(
    "current-score"
  ).innerHTML = `Current : ${currentScore}`;
  window.requestAnimationFrame(render);
};

setup();
img.onload = render;

document.addEventListener("click", () => (gameplaying = true));
document.addEventListener("keypress", () => (gameplaying = true));

const handlejump = () => {
  flight = jump;
};

const handleSpeed = () => {
  turbo = true;
};

document.addEventListener("click", () => {
  handlejump();
});

document.addEventListener("keypress", () => {
  handlejump();
});
