import {Character} from '../objects/character';

export class CharacterMove extends Character {
    constructor() {
        super();
    }

    characterMove() {
        this.htmlElem.style.transform = 'matrix(1, 0, 0, 1,' + this.character_properties.offset_x + ',' + this.character_properties.offset_y + ')';
        this.character_properties.positionX *= this.character_properties.friction;
        this.character_properties.offset_x += this.character_properties.positionX;
    }

    characterMoveXRight() {
        if (this.character_properties.positionX < this.character_properties.speed) {
            this.character_properties.positionX++;
        }
    }

    characterMoveXLeft() {
        if (this.character_properties.positionX > -this.character_properties.speed) {
            this.character_properties.positionX--;
        }
    }

    characterMoveY() {
        if(!this.jump.jumping && this.jump.landing) {
            this.jump.jumping = true;
            this.jump.landing = false;
            this.character_properties.positionY = -this.jump.speed * 2;
        }
    }

    jumpOptions() {
        this.jump.landing = false;
        this.character_properties.positionY += this.jump.gravity;
        this.character_properties.offset_y += this.character_properties.positionY;

        if (this.character_properties.offset_y >= 0) {
            this.jump.jumping = false;
            this.jump.landing = true;
            //this.properties.offset_y = 0;
        }

        if (this.jump.landing) {
            this.character_properties.positionY = 0;
        }
    }
}