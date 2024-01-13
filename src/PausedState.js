class PausedState {
    constructor() {
        this.renderables = [];
        this.updateables = [];
    }

    /** Executed when state is entered. */
    enter(game) {
        console.log('PausedState entered.');
    }

    /** Executed when state is exited. */
    exit(game) {
        console.log('PausedState exited.');
        // Make sure all input accumulated in paused state is dismissed.
        game.input.queue = [];
    }

    execute(game) {
        game.input.queue.forEach(obj => {
            const key = Object.keys(obj)[0];
            const state = obj[key];
            if (key === 'pause' && state === 'released') {
                game.transitionStateTo('running');
            }
        });

        for (const updateable of this.updateables) {
            updateable.update();
        }

        for (const renderable of this.renderables) {
            renderable.render(game.ctx);
        }
    }
}

export { PausedState }