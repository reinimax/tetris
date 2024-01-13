// TODO: This should actually provide functionality to easily access keys and manipulate the queue, 
// so that callers don't have to do so much work and don't have to know about the internals of Input!
class Input {
    constructor() {
        this.queue = [];
        this.keymap = new Map();
        this.keymap.set('ArrowLeft', 'left');
        this.keymap.set('ArrowRight', 'right');
        this.keymap.set('ArrowDown', 'down');
        this.keymap.set('a', 'turnLeft');
        this.keymap.set('d', 'turnRight');
        this.keymap.set('Escape', 'pause');
        document.addEventListener('keydown', this.addKeyPress.bind(this));
        document.addEventListener('keyup', this.removeKeyPress.bind(this));
    }

    addKeyPress(event) {
        if(this.keymap.has(event.key)) { 
            this.queue.push({[this.keymap.get(event.key)]: 'pressed'});
        }
    }

    update() {
        this.queue = [];
    }

    removeKeyPress(event) {
        if(this.keymap.has(event.key)) {
            this.queue.push({[this.keymap.get(event.key)]: 'released'});
        }
    }
}

export {Input};