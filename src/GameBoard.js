class GameBoard {
    constructor(canvas) {
        this.rows = 20;
        this.cols = 10;
        this.cellWidth = canvas.width / this.cols;
        this.cellHeight = canvas.height / this.rows;
        this.cells = this.initializeCells();
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
        // TODO: Add collision detection! If placing the piece with its center of gravitiy
        // would result in part of it being outside the grid, tell the calling code that
        // the piece could not be placed.

        // TODO: Obviously, the pieces should give the impression of falling down from 
        // "above" the canvas. Tweak the algorithm to draw only the last array of the 
        // piece on the first frame.
        for (let row = 0; row < piece.matrix.length; row++) {
            let local_col = col;
            for (let part = 0; part < piece.matrix[row].length; part++) {
                // Tetris pieces are 3 or 4 in width. The center of gravity is 
                // always 1 to the right of the leftmost part of the piece.
                this.cells[row][local_col - 1] = piece.matrix[row][part];
                local_col++;
            } 
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
