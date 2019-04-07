export class Character {

    constructor() {
        this.character = {
            offset_x: 0,
            offset_y: 0,
            speed: 1,
            vector_right: 1,
            vector_left: -1,
            width: 30,
            height: 30,
        };

        this.jump = {
            speed: 5,
            gravity: 1.5,
            vector_up: -1,
            vector_down: 1,
            height: this.character.height * -4,
        };

    }

    characterMove() {
        this.character_elem = document.querySelector('.character');
        this.character_elem.style.transform = 'translate3d(' + this.character.offset_x + 'px,' + this.character.offset_y + 'px,' + '0px)';
    }

    characterMoveXRight() {
        this.characterMove();
        this.character.offset_x += (this.character.speed * this.character.vector_right);
    }

    characterMoveXLeft() {
        this.characterMove();
        this.character.offset_x += (this.character.speed * this.character.vector_left);
    }

    characterMoveY() {
        this.characterMove();
        console.log('request');

        if (this.character.offset_y >= this.jump.height) {
            this.character.offset_y += (this.jump.speed) * this.jump.vector_up;

            if (this.character.offset_y === this.jump.height) {
                this.jump.vector_up = this.jump.vector_down;
            }

            if (this.character.offset_y === 0) {
                this.jump.vector_up = 0;
            }
        }
    }

}