var offsetStart = 560;
var offsetEnd = 560;

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', ( window.pageYOffset - 550 - offsetStart) / ( document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight ));
}, false);


//Copyright (c) 2023 by rgembalik (https://codepen.io/rgembalik/pen/MWKdqRX)
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



let cv = document.querySelector("canvas");
let rect = cv.getBoundingClientRect();

cv.width = rect.width;
cv.height = rect.height;

let ctx = cv.getContext("2d");
let cvWidth = cv.width;
let cvHeight = cv.height;
const TTL = 1200;
const BASE_RADIUS = 3.5;

const mousePos = { x: cv.width, y: cv.height };
const noise = new Noise(Math.random());
const speedNoise = new Noise(Math.random());
let mouseDriven = false;
const perlinTimeStart = Date.now();

let trail = [];

const BASE_COLOR = [0, 0, 0];
const TARGET_COLOR = [0, 0, 0];
const colorFn = (mix) =>
`rgb(${BASE_COLOR.map((color, i) => {
  return color + mix * (TARGET_COLOR[i] - color);
})})`;

const MAX_SPEED = 4; //pixel per frame

/*
 * This is based on stackoverflow thread found here:
 * @link https://stackoverflow.com/questions/37476437/how-to-render-html5-canvas-within-a-loop
 */
function bezierTrail() {
  let points = [null, null, null, null];

  for (var i = 0; i < trail.length; i++) {
    let trailPoint = trail[i];
    points[0] = points[1];
    points[1] = points[2];
    points[2] = trailPoint;

    if (points[0] == null) continue;

    let lifeLeft = 1 - (Date.now() - trailPoint.createdAt) / TTL + 0.4;
    let radius = BASE_RADIUS * lifeLeft + 0.3;

    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];

    var x0 = (p0.x + p1.x) / 2;
    var y0 = (p0.y + p1.y) / 2;

    var x1 = (p1.x + p2.x) / 2;
    var y1 = (p1.y + p2.y) / 2;

    ctx.beginPath();
    ctx.lineWidth = radius * 2;
    ctx.lineCap = "square";

    let x = x1 - x0;
    let y = y1 - y0;

    let speed = Math.min(Math.sqrt(x * x + y * y), MAX_SPEED) / MAX_SPEED;

    ctx.strokeStyle = colorFn(speed);

    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(p1.x, p1.y, x1, y1);
    ctx.stroke();
  }
}

function currentPos() {
  let lastSpeed = 0;

  if (trail.length > 1) {
    let x = mousePos.x - trail[trail.length - 2].x;
    let y = mousePos.y - trail[trail.length - 2].y;
    lastSpeed = Math.min(Math.sqrt(x * x + y * y), MAX_SPEED) / MAX_SPEED;
  }

  let timeSinceMoved = Math.min(
  trail.length > 1 ?
  (Date.now() - trail[trail.length - 2].createdAt) / 1000 :
  1,
  1);


  ctx.beginPath();
  ctx.arc(mousePos.x, mousePos.y, BASE_RADIUS, 0, 2 * Math.PI, false);
  ctx.fillStyle = colorFn((1 - timeSinceMoved) * lastSpeed);
  ctx.fill();
}

function testPath() {
  ctx.save();

  ctx.strokeStyle = "#f00";
  ctx.lineWidth = BASE_RADIUS;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.moveTo(15, 15);
  ctx.lineTo(90, 60);
  ctx.lineTo(210, 100);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}


function animate() {
  // clear canvas
  ctx.clearRect(0, 0, cvWidth, cvHeight);

  trail = trail.filter(tp => Date.now() - tp.createdAt < TTL);

  bezierTrail();
  currentPos();
  ctx.filter = "none";
  bezierTrail();

  //testPath();
  currentPos();
  // call again next time we can draw
  requestAnimationFrame(animate);
}

function addPoint(point) {
  trail.push({
    x: point.x,
    y: point.y,
    createdAt: Date.now() });


  mousePos.x = point.x;
  mousePos.y = point.y;
}

let timerToAuto = null;
function resetManualTimer() {
  if (timerToAuto) clearTimeout(timerToAuto);

  mouseDriven = true;
  timerToAuto = setTimeout(_ => mouseDriven = false, 3000);
}

cv.addEventListener("mousemove", function (e) {
  resetManualTimer();
  addPoint({
    x: e.clientX,
    y: e.clientY });

});

cv.addEventListener(
"touchmove",
function (e) {
  resetManualTimer();
  addPoint({
    x: e.touches[0].clientX,
    y: e.touches[0].clientY });

},
false);


requestAnimationFrame(animate);

let resizeBounce = null;
window.addEventListener("resize", function () {
  clearTimeout(resizeBounce);
  resizeBounce = setTimeout(() => {
    var rect = cv.getBoundingClientRect();

    cv.width = rect.width;
    cv.height = rect.height;
    cvWidth = cv.width;
    cvHeight = cv.height;
  }, 250);
});