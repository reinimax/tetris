class Input {
    constructor() {
        this.keys = [];
        document.addEventListener('keydown', this.addKeyPress);
        document.addEventListener('keyup', this.removeKeyPress);
    }

    addKeyPress(event) {
        console.log(event);
    }

    removeKeyPress(event) {
        console.log(event);
    }
}

export {Input};