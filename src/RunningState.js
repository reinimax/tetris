class RunningState {
    constructor() {
        this.renderables = [];
        this.updateables = [];
    }

    /** Executed when state is entered. */
    enter(game) {
        console.log('RunningState entered.');
    }

    /** Executed when state is exited. */
    exit(game) {
        console.log('RunningState exited.');
    }

    execute(game) {
        if (game.input.keys.includes('pause')) {
            game.transitionStateTo('paused');
        }

        for (const updateable of this.updateables) {
            updateable.update();
        }

        for (const renderable of this.renderables) {
            renderable.render(game.ctx);
        }
    }
}

export { RunningState }