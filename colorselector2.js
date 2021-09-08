"use strict";
selectColor();

function selectColor() {
  const colorWheel = document.querySelector("#colorwheel");
  colorWheel.addEventListener("input", showColor);
}

function showColor() {
  const hexCode = this.value;
  console.log(hexCode);
  const boxDisplay = document.getElementById("colorbox");
  boxDisplay.style.backgroundColor = `${hexCode}`;
  const info = document.querySelector("#infowrapper");
  info.style.color = `${hexCode}`;

  showHexCode(hexCode);
  const RGB = findRGB(hexCode);
  const rgbdisplay = showRGB(RGB);
  const hsl = findHSL(RGB);
  const hsldisplay = showHSL(Math.round(hsl.h), Math.round(hsl.s), Math.round(hsl.l));
  rgbToHex(RGB);
}

function showHexCode(hexname) {
  const hexDiv = document.getElementById("hexDiv");
  hexDiv.textContent = `HEX: ${hexname}`;
}

function findRGB(rgb) {
  let red = rgb.substring(1, 3);
  let green = rgb.substring(3, 5);
  let blue = rgb.substring(5, 7);
  console.log(red, green, blue);

  let r = parseInt(`0x${red}`, 16);
  let g = parseInt(`0x${green}`, 16);
  let b = parseInt(`0x${blue}`, 16);

  console.log(r, g, b);
  return { r, g, b };
}

function showRGB(object) {
  const rgbDiv = document.getElementById("rgbDiv");
  rgbDiv.textContent = `rgb(${object.r}, ${object.g}, ${object.b})`;
  const rgbString = rgbDiv.textContent;
  return rgbString;
}
function rgbToHex(rgbObject) {
  console.log(rgbObject);
  const redhex = Number(rgbObject.r).toString(16);
  const greenhex = Number(rgbObject.g).toString(16);
  const bluehex = Number(rgbObject.b).toString(16);
  const hex = `#${redhex}${greenhex}${bluehex}`;
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}
function findHSL(object) {
  let r = object.r;
  let g = object.g;
  let b = object.b;
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

  return { h, s, l };
}

function showHSL(h, s, l) {
  const hslDiv = document.getElementById("hslDiv");
  hslDiv.textContent = `H: ${h} S: ${s} L: ${l}`;
}
