"use strict";
const colorWheel = document.querySelector("#colorwheel");
colorWheel.addEventListener("input", displayColorBox);

function displayColorBox() {
  let hexCode = this.value;
  console.log(hexCode);
  const boxDisplay = document.getElementById("colorbox");
  boxDisplay.style.backgroundColor = `${hexCode}`;
  showHexCode(hexCode);
}

function showHexCode(hexname) {
  const hexDiv = document.getElementById("hexDiv");
  hexDiv.textContent = `HEX: ${hexname}`;
  findRGB(hexname);
}

function findRGB(rgbInfo) {
  let red = rgbInfo.substring(1, 3);
  let green = rgbInfo.substring(3, 5);
  let blue = rgbInfo.substring(5, 7);
  console.log(red, green, blue);

  roughScale();

  function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
  }
  const r = roughScale(`0x${red}`, 16);
  const g = roughScale(`0x${green}`, 16);
  const b = roughScale(`0x${blue}`, 16);
  console.log(r, g, b);
  showRGB(r, g, b);
}

function showRGB(r, g, b) {
  const rgbDiv = document.getElementById("rgbDiv");
  rgbDiv.textContent = `R: ${r} G:${g} B:${b}`;
  findHSL(r, g, b);
}

function findHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l);
  showHSL(h, s, l);
}

function showHSL(h, s, l) {
  const hslDiv = document.getElementById("hslDiv");
  hslDiv.textContent = `H: ${h} S:${s} L:${l}`;
}
