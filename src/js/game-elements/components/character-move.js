import {Character} from '../objects/character';

export class CharacterMove extends Character {
    constructor() {
        super();
    }

    characterMove() {
        this.htmlElem.style.transform = 'translate3d(' + this.properties.offset_x + 'px,' + this.properties.offset_y + 'px,' + '0px)';
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
        if(!this.jump.jumping && this.jump.landing) {
            this.jump.jumping = true;
            this.jump.landing = false;
            this.properties.position = -this.jump.speed * 2;
        }
    }

    jumpOptions() {
        this.characterMove();
        this.jump.landing = false;

        this.properties.position += this.jump.gravity;
        this.properties.offset_y += this.properties.position;

        if (this.properties.offset_y >= 0) {
            this.jump.jumping = false;
            this.jump.landing = true;
            this.properties.offset_y = 0;
        }

        if (this.jump.landing) {
            this.properties.position = 0;
        }
    }
}