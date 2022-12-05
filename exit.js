// Exit scene
export let ExitScene = class {
  update(dt) {
    // nothing to do here
  }
  render(dt, ctx, canvas) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // display "game over" text
    const gameOverText = 'Game Over';
    ctx.textBaseline = 'top';
    ctx.font = '100px Helvetica';
    ctx.fillStyle = '#ee4024';
    ctx.fillText(
      gameOverText,
      (canvas.width - ctx.measureText(gameOverText).width) / 2,
      canvas.height / 2 - 50
    );
  }
};
