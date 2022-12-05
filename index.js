import { log } from './log.js';
import { MenuScene } from './menu.js';

(function () {
  const getCursorPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  };

  // Main Game Class
  var Game = class {
    constructor() {
      this.canvas = document.createElement('canvas');
      document.body.append(this.canvas);
      this.canvas.width = 400;
      this.canvas.height = 400;
      this.canvas.style='border:1px solid red';
      this.ctx = this.canvas.getContext('2d');
      this.setScene(MenuScene);
      this.initInput();
      this.start();
    }
    initInput() {
      // save keys state
      this.keys = {};
      document.addEventListener('keydown', (e) => {
        this.keys[e.which] = true;
      });
      document.addEventListener('keyup', (e) => {
        this.keys[e.which] = false;
      });
      this.canvas.addEventListener('touchstart', (e) => {
        document.body.append(' ' + e.changedTouches[0].screenX + ' ');
      });
      this.click = {'x':0,'y':0};
      this.canvas.addEventListener('click', (e) => {
        let xy = getCursorPosition(this.canvas, e);

        this.click['x'] = Math.floor(xy[0]);
        this.click['y'] = Math.floor(xy[1]);
        log(`x=${this.click.x} y=${this.click.y}`)
      });
    }
    checkKeyPress(keyCode) {
      // handle key press + release
      let isKeyPressed = !!this.keys[keyCode];
      this.lastKeyState = this.lastKeyState || {};

      // disallow key event from previous scene
      if (typeof this.lastKeyState[keyCode] === 'undefined') {
        this.lastKeyState[keyCode] = isKeyPressed;
        return false;
      }

      // allow press only when state was changed
      if (this.lastKeyState[keyCode] !== isKeyPressed) {
        this.lastKeyState[keyCode] = isKeyPressed;
        return isKeyPressed;
      } else {
        return false;
      }
    }
    setScene(Scene) {
      this.activeScene = new Scene(this);
    }
    update(dt) {
      this.activeScene.update(dt);
    }
    render(dt) {
      this.ctx.save();
      this.activeScene.render(dt, this.ctx);
      this.ctx.restore();
    }
    start() {
      let last = performance.now(),
        step = 1 / 30,
        dt = 0,
        now;

      let frame = () => {
        now = performance.now();
        dt = dt + (now - last) / 1000;
        while (dt > step) {
          dt = dt - step;
          this.update(step);
        }
        last = now;

        this.render(dt);
        requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    }
  };

  // launch game
  var game = new Game();
})();

let bData = {};
bData.val = 9;
log(bData);

document.body.style.backgroundColor="#555"
