import { MenuScene } from './menu.js';

let Player = class {
  constructor(game) {
    this.game = game;
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height / 2;
    this.radius = 20;
  }
  update(dt) {
    if (this.game.click['x'] && this.game.click['y']) {
      let x = Math.trunc(this.game.click.x),
        y = Math.trunc(this.game.click.y);

      const dx = this.x - x;
      const dy = this.y - y;
      if (Math.trunc(this.x) != x) this.x -= Math.trunc((dx * 100) / 30) / 100;
      if (Math.trunc(this.y) != y) this.y -= Math.trunc((dy * 100) / 30) / 100;
    }
  }
  render(dt, ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'lime';
    ctx.fillText(`${this.x} ${this.y}`, 50, 90);
  }
};
let Bubble = class {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * game.canvas.width;
    this.y = game.canvas.height;
    this.radius = 27;
    this.hide = false;
    this.sound = Math.random() >= 0.5 ? 'sound1' : 'sound2';
  }
  update(dt) {
    if (this.y < 0 - this.radius * 2) {
      this.hide = true;
    }
    this.y -= (this.y + this.radius * 3) / (40 + Math.random() * 20);
  }
  render(dt, ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
};
let arrayBubbles = [];
class Ui {
  constructor(game){
    this.game = game;
  }
  update(dt){

  }
  render(ctx){
    ctx.save();
    ctx.fillStyle = 'lime';
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX=2;
    ctx.shadowOffsetY=2;
    ctx.font = this.game.canvas.height * 0.05 + 'px Helvetica';
    ctx.fillText('Очки: ' + this.game.activeScene.score, 4, this.game.canvas.height - 10);
    ctx.restore()
  }
}

// Main game scene
export let GameScene = class {
  constructor(game) {
    this.game = game;
    this.frameCount = 0;
    this.score = 0;

    this.player = new Player(game);
    arrayBubbles.push(new Bubble(game));
    this.ui = new Ui(game)
    this.audio1 = document.createElement('audio');
    this.audio1.src =
      'https://opengameart.org/sites/default/files/bubbles-single1.wav';
    this.audio2 = document.createElement('audio');
    this.audio2.src =
      'https://opengameart.org/sites/default/files/bubbles-single3.wav';
  }
  update(dt) {
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu

    this.player.update(dt);
    arrayBubbles.map((item) => {
      item.update(dt);
      let dx = item.x - this.player.x;
      let dy = item.y - this.player.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < item.radius + this.player.radius) {
        item.sound == 'sound1' ? this.audio1.play() : this.audio2.play();
        this.score++;
        item.hide = true;
      }
    });
    arrayBubbles = arrayBubbles.filter((item) => !item.hide);
  }
  render(dt, ctx) {
    this.frameCount++;
    let canvas = this.game.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ui.render(ctx)

    if (this.frameCount % 60 == 0) arrayBubbles.push(new Bubble(this.game));

    arrayBubbles.map((item) => item.render(dt, ctx));
    this.player.render(dt, ctx);
  }
};
