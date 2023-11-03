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
    }

    execute(game) {
        if (game.input.keys.includes('pause')) {
            game.transitionStateTo('running');
        }

        for (const updateable of this.updateables) {
            updateable.update();
        }

        for (const renderable of this.renderables) {
            renderable.render(game.ctx);
        }
    }
}

export { PausedState }