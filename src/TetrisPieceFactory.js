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
                [2, 0, 0],
                [2, 2, 2],
                [0, 0, 0],
            ],
            [
                [0, 0, 3],
                [3, 3, 3],
                [0, 0, 0],
            ],
            [
                [0, 4, 4],
                [4, 4, 0],
                [0, 0, 0],
            ],
            [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 6, 6, 0],
                [0, 6, 6, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [7, 7, 7, 7],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }

    getNewPiece() {
        const index = Math.floor(Math.random() * this.matrices.length);
        const matrix = structuredClone(this.matrices[index]);
        return new TetrisPiece(matrix, this.input, index + 1);
    }
}

export { TetrisPieceFactory }