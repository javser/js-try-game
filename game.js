import { MenuScene } from './menu.js';

// Main game scene
export let GameScene = class {
  constructor(game) {
    this.game = game;
    this.angle = 0;
    this.posX = game.canvas.width / 2; // Don't use pixels in game logic! This is only for example
    this.posY = game.canvas.height / 2;
  }
  update(dt) {
    if (this.game.keys['87']) this.posY--; // W
    if (this.game.keys['83']) this.posY++; // S
    if (this.game.keys['65']) this.posX--; // A
    if (this.game.keys['68']) this.posX++; // D
    if (this.game.keys['82']) this.angle++; // R
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
  }
  render(dt, ctx, canvas) {
    const rectSize = 150;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(this.posX, this.posY);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.translate(-rectSize / 2, -rectSize / 2);
    ctx.fillStyle = '#0d0';
    ctx.fillRect(0, 0, rectSize, rectSize);
  }
};
