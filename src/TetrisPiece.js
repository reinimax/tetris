class TetrisPiece {
    constructor(pattern, input, symbol) {
        this.matrix = pattern;
        this.lastMatrix = this.matrix;
        this.input = input;
        // The symbol indicating the filled parts of the matrix.
        // This is a number between 1 and 7, which indicates the 
        // type and color of the piece.
        this.symbol = symbol;
    }

    resetMatrix() {
        this.matrix = this.lastMatrix;
    }

    getHeight() {
        let height = 0;
        this.matrix.forEach(row => {
            if (row.includes(this.symbol)) height++;
        });

        return height + this.getOffsetFromTop();
    }

    /** 
     * When the top is empty, the piece would sink too far into the floor because
     * the height is calculated from the top. Thus, we need to offset the height
     * with the number of empty top-rows.
     */
    getOffsetFromTop() {
        let offset = 0;
        let topIsEmpty = true;
        this.matrix.forEach(row => {
            if (topIsEmpty) {
                if(!row.includes(this.symbol)) {
                    offset++;
                } else {
                    topIsEmpty = false;
                }
            }
        });

        return offset;
    }

    updateRotation() {
        this.lastMatrix = this.matrix;
        // Remove items from the queue and rotate, it the item is the command we are looking for.
        // Push the stuff we are not interested in back to the queue. Note that this has the implication
        // that executed commands get "eaten", which is desired (A keypress/command should do ONE action, not multiple ones!).
        // So, this implementation makes the consumer responsible for removing stuff from the queue, not the game or game state
        // as was the case before.
        const tmpQueue = [];
        while (this.input.queue.length > 0) {
            const item = this.input.queue.shift();
            const key = Object.keys(item)[0];
            const state = item[key];
            if (key === 'turnLeft' && state === 'pressed') {
                this.turnLeft();
            }
            else if (key === 'turnRight' && state === 'pressed') {
                this.turnRight();
            }
            // If it's not the key we are looking for, add it back to the queue
            else {
                tmpQueue.push(item);
            }
        }
        this.input.queue = tmpQueue;
    }

    updateCol(col) {
        // TODO: c.f the above fn. This is of course ugly code duplication and should be refactored!
        const tmpQueue = [];
        while (this.input.queue.length > 0) {
            const item = this.input.queue.shift();
            const key = Object.keys(item)[0];
            const state = item[key];
            if (key === 'left' && state === 'pressed') {
                col = col - 1;
            }
            else if (key === 'right' && state === 'pressed') {
                col = col + 1;
            }
            // If it's not the key we are looking for, add it back to the queue
            else {
                tmpQueue.push(item);
            }
        }
        this.input.queue = tmpQueue;
        return col;
    }

    updateRow(row) {
        // TODO: c.f the above fn. This is of course ugly code duplication and should be refactored!
        const tmpQueue = [];
        // Only speed up the downfall of the piece once; ignore additional key presses, lest it falls too quickly!
        let ignoreAdditionalDownPresses = false;
        while (this.input.queue.length > 0) {
            const item = this.input.queue.shift();
            const key = Object.keys(item)[0];
            const state = item[key];
            if (key === 'down' && state === 'pressed') {
                if (!ignoreAdditionalDownPresses) {
                    row++
                    ignoreAdditionalDownPresses = true;
                }
            }
            // If it's not the key we are looking for, add it back to the queue
            else {
                tmpQueue.push(item);
            }
        }
        this.input.queue = tmpQueue;
        return row;
    }

    getOffsetFromLeft() {
        return this.getColOffset(this.matrix);
    }

    getOffsetFromRight() {
        const matrixClone = structuredClone(this.matrix);
        matrixClone.forEach(row => row.reverse());
        return this.getColOffset(matrixClone);
    }

    getColOffset(matrix) {
        let offset = 0;
        let colIsEmpty = true;
        for (let i = 0; i < matrix.length; i++) {
            matrix.forEach(row => {
                if (row[i] === this.symbol) colIsEmpty = false;
            });
            if (colIsEmpty) {
                offset++;
            } else {
                break;
            }
        }
        return offset;
    }

    getColsLeftFromCenter() {
        // The left offset is always 1 for pieces with a length of 3 or 4.
        return 1 - this.getOffsetFromLeft();
    }

    getColsRightFromCenter() {
        if (this.matrix.length === 3) {
            return 1 - this.getOffsetFromRight();
        } else if (this.matrix.length === 4) {
            return 2 - this.getOffsetFromRight();
        } else {
            throw new Error('Invalid matrix length. Tetris pieces can only be 3 or 4 cells wide.');
        }
    }

    /**
     * Turn the tetris piece right.
     * 
     * Turning right means creating a new matrix, where the first 
     * row of the original matrix becomes the last column of the 
     * new matrix and so on, like this:
     * 
     * [a, b, c]    [g, d, a]
     * [d, e, f] => [h, e, b]
     * [g, h, i]    [i, f, c]
     * 
     * This means we can take each element in a row and unshift it 
     * in the corresponding row of a new matrix.
     */
    turnRight() {
        const newMatrix = [];
        this.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (!Array.isArray(newMatrix[colIndex])) {
                    newMatrix[colIndex] = [];
                }
                newMatrix[colIndex].unshift(cell);
            });
        });

        this.matrix = newMatrix;
    }

    /**
     * Turn the tetris piece left.
     * 
     * Cf. the comment for turnRight(). This differs in two ways:
     * First: The first element of the row goes to the LAST column 
     * of the new matrix. This means we need to reverse each row, 
     * then we can go in order again.
     * Second: The first row becomes the FIRST column of the new matrix. 
     * This means we push the elements instead of unshifting them.
     * 
     * [a, b, c]    [c, f, i]
     * [d, e, f] => [b, e, h]
     * [g, h, i]    [a, d, g]
     */
    turnLeft() {
        const newMatrix = [];
        this.matrix.forEach((row, rowIndex) => {
            const reversedRow = structuredClone(row).reverse();
            reversedRow.forEach((cell, colIndex) => {
                if (!Array.isArray(newMatrix[colIndex])) {
                    newMatrix[colIndex] = [];
                }
                newMatrix[colIndex].push(cell);
            });
        });

        this.matrix = newMatrix;
    }
}

export { TetrisPiece };
