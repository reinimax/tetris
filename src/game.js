class Game {

    constructor(canvas, width, height, input) {
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext('2d');
        this.then = null;
        this.fpsInterval = null;
        this.states = {};
        this.currentState = null;
        this.input = input;
    }

    addState(key, state) {
        this.states[key] = state;
    }

    transitionStateTo(stateKey) {
        if (this.currentState) {
            this.currentState.exit(this);
        }
        this.currentState = this.states[stateKey];
        this.currentState.enter(this);
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

        if (this.currentState) {
            this.currentState.execute(this);
        } else {
            throw new Error('No game state is set.');
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
