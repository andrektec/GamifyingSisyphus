const slider = document.getElementById("slider");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const shopLink = document.getElementById("shoplink");
const creditsLink = document.getElementById("creditslink");
const shop = document.getElementById("shop");
const credits = document.getElementById("credits");
const closelink = document.getElementsByClassName("close");
const fslink = document.getElementById("fslink");

const SItemImg = document.querySelector("#shopitem img");
const SItemP = document.querySelector("#shopitem p");
const SItemA = document.querySelector("#shopitem a");
const prevLink = document.getElementById("prev");
const nextLink = document.getElementById("next");
const buyLink = document.getElementById("buy");

let rolls = 10;
let score = 10;
let lastValue = 0;
let fullscreen = false;
let selShopItem = 0;
let purchasedstickers = [];

slider.oninput = () => {
  // check if user is trying to click slider and not rock
  if (Math.abs(lastValue - slider.value) > 70) {
    slider.value = lastValue;
    return;
  }

  updateRockAndBG();

  if (slider.value === slider.max) {
    score++;
    rolls++;
    slider.toggleAttribute("disabled");

    setTimeout(rockOnTop, 800);
    updateUI();
  }
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
    "--BG-bottom",
    map_bottom(slider.value) + "px"
  );
}

function updateUI() {
  scoreEl.innerText = "Score: " + score;

  switch (rolls) {
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
      shopLink.innerHTML = `${messages[0]}`;
      break;
  }
}

function navigateShop(direction = 1) {
  if (direction === 0 && selShopItem != 0) selShopItem--;
  if (direction === 1 && selShopItem != shopitems.length - 1) selShopItem++;

  updateItemUI();
}

function buySticker() {
  if (purchasedstickers.includes(selShopItem)) return;
  if (score < shopitems[selShopItem].price) return;

  score -= shopitems[selShopItem].price;
  purchasedstickers.push(selShopItem);

  let bodyStyle = getComputedStyle(document.body);

  let lastrockBG = bodyStyle.getPropertyValue("--rockBG");
  console.log(lastrockBG);
  document.documentElement.style.setProperty(
    "--rockBG",
    `url("${shopitems[selShopItem].src}") ${shopitems[selShopItem].pos}, ${lastrockBG}`
  );
  let lastrockBGsize = bodyStyle.getPropertyValue("--rockBG-size");
  console.log(lastrockBGsize);
  document.documentElement.style.setProperty(
    "--rockBG-size",
    `25%, ${lastrockBGsize}`
  );

  updateItemUI();
  updateUI();
}

function updateItemUI() {
  const isPurchased = purchasedstickers.includes(selShopItem);

  SItemImg.src = shopitems[selShopItem].src;
  SItemP.innerText = shopitems[selShopItem].desc;
  SItemA.innerText = isPurchased
    ? "Sold out"
    : `Buy - ${shopitems[selShopItem].price} points`;
  if (isPurchased) {
    SItemImg.classList.add("disabled");
    SItemA.classList.add("disabled");
  } else {
    SItemImg.classList.remove("disabled");
    if (score < shopitems[selShopItem].price) SItemA.classList.add("disabled");
    else SItemA.classList.remove("disabled");
  }
}

/*creditsLink.addEventListener("click", () => {
  credits.style.display = "block";
});*/
shopLink.addEventListener("click", () => {
  if (rolls >= 10) shop.style.display = "block";
  updateItemUI();
});
fslink.addEventListener("click", () => {
  if (fullscreen) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
  fullscreen = !fullscreen;
});

prevLink.addEventListener("click", () => {
  navigateShop(0);
});
nextLink.addEventListener("click", () => {
  navigateShop(1);
});

buyLink.addEventListener("click", () => {
  buySticker();
});

Array.from(closelink).forEach((el) => {
  el.addEventListener("click", function (event) {
    event.preventDefault();
    credits.style.display = "none";
    shop.style.display = "none";
  });
});

function map_left(value) {
  const [sliderLow, sliderHigh, BGLeft_low, BGLeft_high] = [0, 400, -500, -800];
  return (
    BGLeft_low +
    ((BGLeft_high - BGLeft_low) * (value - sliderLow)) /
      (sliderHigh - sliderLow)
  );
}
function map_bottom(value) {
  const [sliderLow, sliderHigh, BGBottom_low, BGBottom_high] = [
    0, 400, 0, -600,
  ];
  return (
    BGBottom_low +
    ((BGBottom_high - BGBottom_low) * (value - sliderLow)) /
      (sliderHigh - sliderLow)
  );
}

var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
