export class Character {

    constructor() {
        this.character_offset_x = 0;
        this.character_offset_y = 0;

        this.jump_speed = 5;
        this.jump_vector_up = -1;
        this.jump_vector_down = 1;
        this.jump_height = -120;

        this.character_speed = 1;
        this.character_vector_right = 1;
        this.character_vector_left = -1;
    }

    characterMove() {
        this.character_elem = document.querySelector('.character');
        this.character_elem.style.transform = 'translate3d(' + this.character_offset_x + 'px,' + this.character_offset_y + 'px,' + '0px)';
    }

    characterMoveXRight() {
        this.characterMove();
        this.character_offset_x += (this.character_speed * this.character_vector_right);
    }

    characterMoveXLeft() {
        this.characterMove();
        this.character_offset_x += (this.character_speed * this.character_vector_left);
    }

    characterMoveY() {
        this.characterMove();
        this.character_offset_y += (this.jump_speed * this.jump_vector_up);
    }

}