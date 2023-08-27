class TetrisPiece {
    constructor(pattern, input) {
        this.matrix = pattern;
        this.input = input;
    }

    getHeight() {
        let height = 0;
        this.matrix.forEach(row => {
            if (row.includes(1)) height++;
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
                if(!row.includes(1)) {
                    offset++;
                } else {
                    topIsEmpty = false;
                }
            }
        });

        return offset;
    }

    updateCol(col) {
        if(this.input.keys.includes('left')) {
            col = col - 1;
        }
        if(this.input.keys.includes('right')) {
            col = col + 1;
        }
        return col;
    }

    updateRow(row) {
        if(this.input.keys.includes('down')) {
            row++
        }
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
                if (row[i] === 1) colIsEmpty = false;
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
}

export { TetrisPiece };
