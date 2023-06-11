class Game {

    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext('2d');
        this.renderables = [];
        this.updateables = [];
    }

    start() {
        this.gameLoop();
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const updateable of this.updateables) {
            updateable.update();
        }

        for (const renderable of this.renderables) {
            renderable.render(this.ctx);
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

}

export { Game };
