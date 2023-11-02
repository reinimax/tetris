class Score {
    constructor() {
        this.points = 0;
        // Points for clearing 1, 2, 3 or 4 lines in one go.
        this.socringMatrix = [40, 100, 300, 1200];
    }

    addScore(rowCount) {
        this.points += this.socringMatrix[rowCount - 1];
    }

    getScore() {
        return this.points;
    }
}

export { Score }