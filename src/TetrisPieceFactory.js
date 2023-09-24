import { TetrisPiece } from "./TetrisPiece.js";

class TetrisPieceFactory {
    constructor(input) {
        this.input = input;
    }

    getNewPiece() {
        // TODO: replace this obvious placeholder with the real creation code!
        const demoPiece = new TetrisPiece([
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ], this.input);
        return demoPiece;
    }
}

export { TetrisPieceFactory }