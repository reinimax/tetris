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

    placeTetrisPiece(piece, col) {
        this.activePiece = piece;
        this.activeCol = col;
        // TODO: Add collision detection! If placing the piece with its center of gravitiy
        // would result in part of it being outside the grid, tell the calling code that
        // the piece could not be placed.

        // TODO: Obviously, the pieces should give the impression of falling down from 
        // "above" the canvas. Tweak the algorithm to draw only the last array of the 
        // piece on the first frame.
        for (let row = this.activeRow; row < piece.matrix.length + this.activeRow; row++) {
            let local_col = col;
            for (let part = 0; part < piece.matrix[row - this.activeRow].length; part++) {
                if (this.cells[row]) {
                    // Tetris pieces are 3 or 4 in width. The center of gravity is 
                    // always 1 to the right of the leftmost part of the piece.
                    this.cells[row][local_col - 1] = piece.matrix[row - this.activeRow][part];
                }
                local_col++;
            }
        }
    }

    update() {
        if (this.activePiece === null || this.activeCol === null) {
            return;
        }
        // Erase the previous position on the gameboard.
        for (let row = 0; row < this.activePiece.matrix.length; row++) {
            let local_col = this.activeCol;
            for (let part = 0; part < this.activePiece.matrix[row].length; part++) {
                // Check if there is a 1 on this place on the gameboard and if there 
                // is also a 1 in the matrix of the piece. This makes sure we clear 
                // only the parts of the gameboard where the piece was drawn and not 
                // any neighboring areas.
                if (this.cells[row][local_col - 1] && this.activePiece.matrix[row][part]) {
                    this.cells[row][local_col - 1] = 0;
                }
                local_col++;
            } 
        }
        // Increment the row and place the piece on the new row.
        this.activeRow++;
        this.placeTetrisPiece(this.activePiece, this.activeCol);
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
