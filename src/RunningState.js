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
        let shouldBreak = false;
        game.input.queue.forEach(obj => {
            const key = Object.keys(obj)[0];
            const state = obj[key];
            if (key === 'pause' && state === 'released') {
                game.transitionStateTo('paused');
                game.input.queue = [];
                shouldBreak = true;
            }
        });
        // This is just a crutch. The problem is, that we have too few frames.
        // Actually, the game should run with more frames, but update only so often ...
        if (!shouldBreak) {
            for (const updateable of this.updateables) {
                updateable.update();
            }
        }

        for (const renderable of this.renderables) {
            renderable.render(game.ctx);
        }
    }
}

export { RunningState }