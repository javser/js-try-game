import { MenuScene } from './menu.js';

function pointInPoly(polyCords, pointX, pointY) {
  var i,
    j,
    c = 0;

  for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {
    if (
      polyCords[i][1] > pointY != polyCords[j][1] > pointY &&
      pointX <
        ((polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1])) /
          (polyCords[j][1] - polyCords[i][1]) +
          polyCords[i][0]
    ) {
      c = !c;
    }
  }
  return c;
}

//create and fill polygon
CanvasRenderingContext2D.prototype.fillPolygon = function (
  pointsArray,
  fillColor,
  strokeColor
) {
  if (pointsArray.length <= 0) return;
  this.beginPath();
  this.moveTo(pointsArray[0][0], pointsArray[0][1]);
  for (var i = 0; i < pointsArray.length; i++) {
    this.lineTo(pointsArray[i][0], pointsArray[i][1]);
  }
  this.closePath();
  if (strokeColor != null && strokeColor != undefined)
    this.strokeStyle = strokeColor;

  if (fillColor != null && fillColor != undefined) {
    this.fillStyle = fillColor;
    this.fill();
  }
};
//And you can use this method as
var polygonPoints = [
  [-110, -10],
  [20, 35],
  [50, 80],
  [100, 10],
  [10, 100],
];
let p2 = [
  [-130, -130],
  [-70, -130],
  [-50, -100],
  [-130, -90],
];

// Main game scene
export let GameScene = class {
  constructor(game) {
    this.game = game;
    this.angle = 0;
    this.posX = game.canvas.width / 2; // Don't use pixels in game logic! This is only for example
    this.posY = game.canvas.height / 2;
  }
  update(dt) {
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu

    if (this.game.click['x'] && this.game.click['y']) {
      let x = this.game.click.x,
        y = this.game.click.y;

      const dx = this.posX - x;
      const dy = this.posY - y;
      if (this.posX != x) this.posX -= dx / 30;
      if (this.posY != y) this.posY -= dy / 30;
    }
  }
  render(dt, ctx, canvas) {
    //canvas.style = 'outline: 1px dashed';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillPolygon(polygonPoints, '#F05');

    ctx.fillPolygon(p2, '#0f0');

    ctx.fillText(dt, 170, 80);
    ctx.fillText(`${this.posX} ${this.posY}`, 150, 90);
  }
};
