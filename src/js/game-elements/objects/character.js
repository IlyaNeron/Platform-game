import {BaseObject} from './base-object';
export class Character extends BaseObject {

    constructor() {
        super();

        this.background = '#00f';

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
        const jump_height = -120;

        if (this.character.offset_y >= jump_height) {
            let req = requestAnimationFrame(() => this.characterMoveY());
            this.character.offset_y += this.jump.speed * this.jump.vector_up;
            console.log(this.character.offset_y);

            if (this.character.offset_y === jump_height) {
                this.jump.vector_up = 1;
            }

            setTimeout(() => {
                cancelAnimationFrame(req)
            }, 300);
        }


        //console.log(this.n);
    }

}