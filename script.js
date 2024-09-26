const slider = document.getElementById("slider");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const shopLink = document.getElementById("shoplink");
const creditsLink = document.getElementById("creditslink");
const shop = document.getElementById("shop");
const credits = document.getElementById("credits");
const closelink = document.getElementsByClassName("close");
let score = 9;

slider.oninput = function () {
  updateRock();

  if (slider.value === slider.max) {
    score++;
    slider.toggleAttribute("disabled");

    setTimeout(rockOnTop, 800);
    updateUI();
  }
};

function rockOnTop() {
  const interval = setInterval(function () {
    updateRock();

    if (slider.value > 0) {
      slider.value -= 1;
    } else if (slider.value < 0) {
      slider.value = 0;
    } else {
      slider.toggleAttribute("disabled");
      clearInterval(interval);
    }
  }, 3);
}

function updateRock() {
  // Set rock rotation with slider value
  document.documentElement.style.setProperty(
    "--rotation-angle",
    slider.value + "deg"
  );

  // Set rock margin offset with slider value
  document.documentElement.style.setProperty(
    "--margin-offset",
    Math.round(Number(slider.value) / 16) + "px"
  );
}

function updateUI() {
  scoreEl.innerText = "Score: " + score;

  switch (score) {
    case 2:
      messageEl.innerText = messages[1];
      break;
    case 4:
      messageEl.innerText = messages[2];
      break;
    case 7:
      messageEl.innerText = messages[3];
      break;
    case 10:
      messageEl.innerText = messages[4];
      shopLink.innerText = messages[0];
      break;
  }
}

creditsLink.addEventListener("click", () => {
  credits.style.display = "flex";
});
shopLink.addEventListener("click", () => {
  if (score >= 10) shop.style.display = "flex";
});

Array.from(closelink).forEach((el) => {
  el.addEventListener("click", function () {
    credits.style.display = "none";
    shop.style.display = "none";
  });
});
