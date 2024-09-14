var slider = document.getElementById("slider");

slider.oninput = function () {
  document.documentElement.style.setProperty(
    "--rotation-angle",
    slider.value + "deg"
  );

  if (slider.value === slider.max) {
    console.log("100");
    slider.toggleAttribute("disabled");

    setTimeout(function () {
      console.log("1sec");
      var interval = setInterval(function () {
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
};
