class GameBoard {
    constructor(canvas) {
        this.rows = 20;
        this.cols = 10;
        this.cellWidth = canvas.width / this.cols;
        this.cellHeight = canvas.height / this.rows;
        this.cells = this.initializeCells();
        this.activePiece = null;
        this.activeCol = null;
        this.activeRow = 0;
    }

    initializeCells() {
        const cells = [];
        
        for (let row = 0; row < this.rows; row++) {
            cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                cells[row][col] = 0;
            }
        }

        return cells;
    }

    placeTetrisPieceInitial(piece, col) {
        this.activePiece = piece;
        this.activeCol = col;
        this.activeRow = 0 - this.activePiece.matrix.length - 1;

        this.placeTetrisPiece();
    }

    placeTetrisPiece() {
        this.overlapTetrisPieceWithBoardCallback(this.doPlacePiece.bind(this));
    }

    /**
     * Loop over every cell in the matrix of a tetris piece and apply a callback.
     * 
     * Arguments passed to the callback:
     * - row: The row on the gameboard corresponding to the row in the matrix of the piece.
     * - col: The column on the gameboard corresponding to the column in the matrix of the piece.
     * - matrixRow: The current row in the matrix of the tetris piece.
     * - matrixCol: The current column in the matrix of the tetris piece.
     * 
     */
    overlapTetrisPieceWithBoardCallback(cb) {
        if (!(cb instanceof Function)) {
            return;
        }

        for (let row = this.activeRow; row < this.activePiece.matrix.length + this.activeRow; row++) {
            let local_col = this.activeCol;
            for (let part = 0; part < this.activePiece.matrix[row - this.activeRow].length; part++) {
                if (this.cells[row]) {
                    let rowInTetrisPieceMatrix = row - this.activeRow;
                    // Tetris pieces are 3 or 4 in width. The center of gravity is 
                    // always 1 to the right of the leftmost part of the piece.
                    cb(row, local_col - 1, rowInTetrisPieceMatrix, part);
                }
                local_col++;
            }
        }
    }

    doPlacePiece(row, col, matrixRow, maxtrixCol) {
        this.cells[row][col] = this.activePiece.matrix[matrixRow][maxtrixCol];
    }

    update() {
        if (this.activePiece === null || this.activeCol === null) {
            return;
        }
        this.eraseTetrisPiece();
        this.rotateActivePiece();
        this.incrementActiveRow();
        this.updateActiveRow();
        this.updateActiveCol();
        this.placeTetrisPiece();

        // After everything has processed, check if the piece has hit the 
        // floor. If so, this piece is no longer active.
        // TODO: spawn a new one.
        if (this.activePieceHitFloor()) {
            this.activePiece = null;
        }
    }

    eraseTetrisPiece() {
        this.overlapTetrisPieceWithBoardCallback(this.doEraseTetrisPiece.bind(this));
    }

    doEraseTetrisPiece(row, col, matrixRow, maxtrixCol) {
        // Check if there is a 1 on this place on the gameboard and if there 
        // is also a 1 in the matrix of the piece. This makes sure we clear 
        // only the parts of the gameboard where the piece was drawn and not 
        // any neighboring areas.
        if (this.cells[row][col] && this.activePiece.matrix[matrixRow][maxtrixCol]) {
            this.cells[row][col] = 0;
        }
    }

    rotateActivePiece() {
        this.activePiece.updateRotation();
        if(this.activePieceWouldHitWall(this.activePiece.updateCol(this.activeCol)) || this.activePieceHitFloor()) {
            this.activePiece.resetMatrix();
        }
    }

    incrementActiveRow() {
        if (!this.activePieceHitFloor()) {
            this.activeRow++;
        }
    }

    activePieceHitFloor() {
        return this.activeRow >= this.rows - this.activePiece.getHeight();
    }

    updateActiveCol() {
        const colBeforeUpdate = this.activeCol;
        this.activeCol = this.activePiece.updateCol(this.activeCol);
        // Check if the piece is out of bounds with the gameboard after it has been updated.
        // If so, reset it.
        if (this.activePieceWouldHitWall(this.activeCol)) {
            this.activeCol = colBeforeUpdate;
        }
    }

    activePieceWouldHitWall(col) {
        return col - this.activePiece.getColsLeftFromCenter() < 0 || 
        col + this.activePiece.getColsRightFromCenter() >= this.cols;
    }

    updateActiveRow() {
        const rowBeforeUpdate = this.activeRow;
        this.activeRow = this.activePiece.updateRow(this.activeRow);
        // Check if the piece is out of bounds with the gameboard after it has been updated.
        // If so, reset it.
        if (this.activePieceHitFloor()) {
            this.activeRow = rowBeforeUpdate;
        }

    }

    render(ctx) {
        this.drawCells(ctx);
    }

    drawCells(ctx) {
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#00F';

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.cells[row][col]) {
                    this.drawCellWithTetrisPiece(ctx, col, row);
                } else {
                    this.drawEmptyCell(ctx, col, row);
                }
            }
        }
    }

    drawCellWithTetrisPiece(ctx, x, y) {
        ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
    }

    drawEmptyCell(ctx, x, y) {
        ctx.beginPath();
        ctx.rect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
        ctx.stroke();
    }
}

export {GameBoard};
