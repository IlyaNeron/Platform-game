export class Controls {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.fire = false;
        this.keyMap = new Map([
            ['ArrowUp', 'up'], ['ArrowDown', 'down'], ['ArrowLeft', 'left'], ['ArrowRight', 'right'], [' ', 'fire']
        ]);
        document.addEventListener('keydown', (e) => this.update(e, true));
        document.addEventListener('keyup', (e) => this.update(e, false));
    }

    update(e, pressed) {

        if (this.keyMap.has(e.key)) {
            this[this.keyMap.get(e.key)] = pressed;
        }
    }

}