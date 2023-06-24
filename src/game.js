class Game {

    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext('2d');
        this.renderables = [];
        this.updateables = [];
        this.then = null;
        this.fpsInterval = null;
    }

    start(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
      
        if (!this.shouldUpdate()) {
            return;
        }

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const updateable of this.updateables) {
            updateable.update();
        }

        for (const renderable of this.renderables) {
            renderable.render(this.ctx);
        }

    }

    shouldUpdate() {
        let now = Date.now();
        let elapsed = now - this.then;
      
        if (elapsed <= this.fpsInterval) {
            return false;
        }

        this.then = now;
        return true;
    }

}

export { Game };
