import { TetrisPiece } from "./TetrisPiece.js";

class TetrisPieceFactory {
    constructor(input) {
        this.input = input;
        this.matrices = [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }

    getNewPiece() {
        const index = Math.floor(Math.random() * this.matrices.length);
        const matrix = structuredClone(this.matrices[index]);
        return new TetrisPiece(matrix, this.input);
    }
}

export { TetrisPieceFactory }