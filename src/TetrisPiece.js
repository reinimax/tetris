class TetrisPiece {
    constructor(pattern) {
        this.matrix = pattern;
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
}

export { TetrisPiece };
