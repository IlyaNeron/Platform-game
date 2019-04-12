import {Character} from '../objects/character';

export class CharacterMove extends Character {
    constructor() {
        super();
    }

    characterMove() {
        this.htmlElem.style.transform = 'matrix(1, 0, 0, 1,' + this.properties.offset_x + ',' + this.properties.offset_y + ')';
        this.properties.positionX *= this.properties.friction;
        this.properties.offset_x += this.properties.positionX;
    }

    characterMoveXRight() {
        if (this.properties.positionX < this.properties.speed) {
            this.properties.positionX++;
        }
    }

    characterMoveXLeft() {
        if (this.properties.positionX > -this.properties.speed) {
            this.properties.positionX--;
        }
    }

    characterMoveY() {
        if(!this.jump.jumping && this.jump.landing) {
            this.jump.jumping = true;
            this.jump.landing = false;
            this.properties.positionY = -this.jump.speed * 2;
        }
    }

    jumpOptions() {
        this.jump.landing = false;
        this.properties.positionY += this.jump.gravity;
        this.properties.offset_y += this.properties.positionY;

        if (this.properties.offset_y >= 0) {
            this.jump.jumping = false;
            this.jump.landing = true;
            this.properties.offset_y = 0;
        }

        if (this.jump.landing) {
            this.properties.positionY = 0;
        }
    }
}