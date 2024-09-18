const slider = document.getElementById("slider");
const scoreSpan = document.getElementById("score");
let score = 0;

slider.oninput = function () {
  document.documentElement.style.setProperty(
    "--rotation-angle",
    slider.value + "deg"
  );

  if (slider.value === slider.max) {
    score++;
    slider.toggleAttribute("disabled");

    setTimeout(function () {
      const interval = setInterval(function () {
        document.documentElement.style.setProperty(
          "--rotation-angle",
          slider.value + "deg"
        );

        if (slider.value > 0) {
          slider.value -= 1;
        } else if (slider.value < 0) {
          slider.value = 0;
        } else {
          slider.toggleAttribute("disabled");
          clearInterval(interval);
        }
      }, 3);
    }, 800);
  }

  scoreSpan.innerText = "Score: " + score;
};
