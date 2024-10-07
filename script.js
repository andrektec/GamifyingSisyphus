const slider = document.getElementById("slider");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const shopLink = document.getElementById("shoplink");
const creditsLink = document.getElementById("creditslink");
const shop = document.getElementById("shop");
const credits = document.getElementById("credits");
const closelink = document.getElementsByClassName("close");
let score = 9;
let lastValue = 0;

slider.oninput = () => {
  // check if user is trying to click slider and not rock
  if (Math.abs(lastValue - slider.value) > 70) {
    slider.value = lastValue;
    return;
  }

  updateRockAndBG();

  if (slider.value === slider.max) {
    score++;
    slider.toggleAttribute("disabled");

    setTimeout(rockOnTop, 800);
    updateUI();
  }
};

slider.onmouseout = () => {
  if (slider.value === slider.max) return;
  setTimeout();
};

function rockOnTop() {
  const interval = setInterval(function () {
    updateRockAndBG();

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

function updateRockAndBG() {
  // Set last value variable
  lastValue = slider.value;

  // Set rock rotation with slider value
  document.documentElement.style.setProperty(
    "--rotation-angle",
    slider.value * 2 + "deg"
  );

  /* Set rock margin offset with slider value
  document.documentElement.style.setProperty(
    "--margin-offset",
    Math.round(Number(slider.value) / 16) - 30 + "px"
  );*/

  // update BG
  document.documentElement.style.setProperty(
    "--BG-left",
    map_left(slider.value) + "px"
  );
  document.documentElement.style.setProperty(
    "--BG-top",
    map_top(slider.value) + "px"
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

function map_left(value) {
  const [sliderLow, sliderHigh, BGLeft_low, BGLeft_high] = [0, 400, 1000, -100];
  return (
    BGLeft_low +
    ((BGLeft_high - BGLeft_low) * (value - sliderLow)) /
      (sliderHigh - sliderLow)
  );
}
function map_top(value) {
  const [sliderLow, sliderHigh, BGLeft_low, BGLeft_high] = [0, 400, -500, 700];
  return (
    BGLeft_low +
    ((BGLeft_high - BGLeft_low) * (value - sliderLow)) /
      (sliderHigh - sliderLow)
  );
}
