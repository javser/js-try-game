import { ExitScene } from './exit.js';
import { IntroScene } from './intro.js';
import { GameScene } from './game2.js';

// Menu scene
export let MenuScene = class {
  constructor(game) {
    // set default values
    this.game = game;
    this.opacityDirection = 1;
    this.menuActiveOpacity = 0;
    this.menuIndex = 0;
    this.menuTitle = 'Game Menu';
    this.menuItems = ['Start', 'Intro', 'Exit'];
    this.elems = [];
    this.checkedItem = false;
    //console.log(this.menuItems.entries().next());
  }
  update(dt) {
    // calculate active menu item opacity
    let opacityValue = this.menuActiveOpacity + dt * this.opacityDirection;
    if (opacityValue > 1 || opacityValue < 0) this.opacityDirection *= -1;
    this.menuActiveOpacity += dt * this.opacityDirection;

    // menu navigation
    if (this.game.checkKeyPress(83)) {
      // DOWN arrow
      this.menuIndex++;
      this.menuIndex %= this.menuItems.length;
    } else if (this.game.checkKeyPress(87)) {
      // UP arrow
      this.menuIndex--;
      if (this.menuIndex < 0) this.menuIndex = this.menuItems.length - 1;
    }

    if (this.game.click['x'] && this.game.click['y']) {
      let x = this.game.click['x'],
        y = this.game.click['y'];

      // Collision detection between clicked offset and element.
      this.elems.forEach(
        function (elem) {
          if (
            y > elem.y &&
            y < elem.y + elem.height &&
            x > elem.x &&
            x < elem.x + elem.width
          ) {
            this.menuIndex = elem.i;
            this.checkedItem = true;
          }
        }.bind(this)
      );
      this.game.click = {};
    }
    // menu item selected
    if (this.game.checkKeyPress(13) || this.checkedItem) {
      switch (this.menuIndex) {
        case 0:
          this.game.setScene(GameScene);
          break;
        case 1:
          this.game.setScene(IntroScene);
          break;
        case 2:
          this.game.setScene(ExitScene);
          break;
      }
    }
  }
  render(dt, ctx) {
    // fill menu background
    ctx.fillStyle = '#007';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // draw menu title
    ctx.font = '60px Helvetica';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.fillText(
      this.menuTitle,
      Math.floor((this.game.canvas.width - ctx.measureText(this.menuTitle).width) / 2),
      20
    );

    // draw menu items
    const itemHeight = 170,
      fontSize = 40;
    ctx.font = fontSize + 'px Helvetica';
    for (const [index, item] of this.menuItems.entries()) {
      if (index === this.menuIndex) {
        ctx.globalAlpha = this.menuActiveOpacity;
        ctx.fillStyle = '#089cd3';
        ctx.fillRect(
          Math.floor(0 + (index * this.game.canvas.width) / this.menuItems.length),
          Math.floor(this.game.canvas.height / 3),
          Math.floor(this.game.canvas.width / this.menuItems.length),
          itemHeight
        );
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ff0';
      ctx.fillText(
        item,
        Math.floor(
          (index * this.game.canvas.width) / this.menuItems.length +
            (this.game.canvas.width / this.menuItems.length -
              ctx.measureText(item).width) /
              2
        ),
        Math.floor(this.game.canvas.height / 3 + (itemHeight - fontSize) / 2)
      );

      if (this.elems.filter((e) => e.name == item).length == 0) {
        this.elems.push({
          name: item,
          i: index,
          x: Math.floor((index * this.game.canvas.width) / this.menuItems.length),
          y: Math.floor(this.game.canvas.height / 3),
          width: Math.floor(this.game.canvas.width / this.menuItems.length),
          height: itemHeight,
        });
      }
    }
  }
};
