import { MenuScene } from './menu.js';

// Intro scene
export let IntroScene = class {
  constructor(game) {
    this.logoRevealTime = 2;
    this.textTypingTime = 2;
    this.sceneDisplayTime = 6;

    this.elapsedTime = 0;
    this.bigText = 'Intro';
    this.infoText = 'This is intro scene example...';
    this.game = game;
  }
  update(dt) {
    this.elapsedTime += dt;

    // switch to next scene (by timer or if user want to skip it)
    if (
      this.elapsedTime >= this.sceneDisplayTime ||
      this.game.checkKeyPress(13)
    ) {
      this.game.setScene(MenuScene);
    }
  }
  render(dt, ctx) {
    let canvas = this.game.canvas;
    // fill background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillText(
      this.elapsedTime,
      (canvas.width - ctx.measureText(this.elapsedTime).width) / 2,
      canvas.height / 10
    );

    // draw big logo text
    ctx.globalAlpha = Math.min(1, this.elapsedTime / this.logoRevealTime);
    ctx.font = this.game.canvas.height * 0.3 + 'px Helvetica';
    ctx.fillStyle = '#fff';
    ctx.fillText(
      this.bigText,
      (canvas.width - ctx.measureText(this.bigText).width) / 2,
      canvas.height / 2
    );

    // draw typing text
    if (this.elapsedTime >= this.logoRevealTime) {
      let textProgress = Math.min(
        1,
        (this.elapsedTime - this.logoRevealTime) / this.textTypingTime
      );
      ctx.font = this.game.canvas.height * 0.1 + 'px Helvetica';
      ctx.fillStyle = '#bbb';
      ctx.fillText(
        this.infoText.substr(
          0,
          Math.floor(this.infoText.length * textProgress)
        ),
        (canvas.width - ctx.measureText(this.infoText).width) / 2,
        canvas.height / 2 + 80
      );
    }
  }
};
