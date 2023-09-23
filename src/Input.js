class Input {
    constructor() {
        this.keys = [];
        // We save keyups in this array and use it to remove these keys in the
        // update-function to make sure even short keypresses get executed once.
        this.keysToRemove = [];
        this.keymap = new Map();
        this.keymap.set('ArrowLeft', 'left');
        this.keymap.set('ArrowRight', 'right');
        this.keymap.set('ArrowDown', 'down');
        this.keymap.set('a', 'turnLeft');
        this.keymap.set('d', 'turnRight');
        document.addEventListener('keydown', this.addKeyPress.bind(this));
        document.addEventListener('keyup', this.removeKeyPress.bind(this));
    }

    addKeyPress(event) {
        if(this.keymap.has(event.key)) {
            this.keys.push(this.keymap.get(event.key));
        }
    }

    update() {
        this.keys = this.keys.filter(key => !this.keysToRemove.includes(key));
    }

    removeKeyPress(event) {
        if(this.keymap.has(event.key)) {
            this.keysToRemove.push(this.keymap.get(event.key));
        }
    }
}

export {Input};