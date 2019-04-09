import {Character} from '../objects/character';

export class CharacterMove extends Character {
    constructor() {
        super();
    }

    characterMove() {
        this.character_elem = document.querySelector('.character');
        this.character_elem.style.transform = 'translate3d(' + this.properties.offset_x + 'px,' + this.properties.offset_y + 'px,' + '0px)';
    }

    characterMoveXRight() {
        this.characterMove();
        this.properties.offset_x += (this.properties.speed * this.properties.vector_right);
    }

    characterMoveXLeft() {
        this.characterMove();
        this.properties.offset_x += (this.properties.speed * this.properties.vector_left);
    }

    characterMoveY() {
        if(!this.jump.jumping) {
            this.jump.jumping = true;
            this.jump.distance = -this.jump.speed * 2;
        }
    }

    jumpOptions() {
        this.characterMove();
        this.jump.distance += this.jump.gravity;
        this.properties.offset_y += this.jump.distance;

        if (this.properties.offset_y >= 0) {
            this.properties.offset_y = 0;
            this.jump.jumping = false;
        }
    }
}