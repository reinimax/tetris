class InGameUI {
    
    constructor(gameBoard) {
        this.score = gameBoard.score;
    }

    render(ctx) {
        // TODO: make this actually render something
        console.log("Score (from UI class):" + this.score.getScore());
    }
}

export { InGameUI }