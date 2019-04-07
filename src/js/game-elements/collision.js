export class Collision {

    constructor() {
        this.block = Array.from(document.querySelectorAll('.block'));
        this.character = document.querySelector('.character');
    }

    detection() {
       // if ((this.character_pos.YB > this.block_pos.YT) || (this.character_pos.YT < this.block_pos.YB)) {
            if ((this.character_pos.XR === this.block_pos.XL) || (this.character_pos.XL === this.block_pos.XR)) {
                console.log('detect');

            }
       // }

        console.log('block', this.block_pos);
        console.log('character', this.character_pos);

    }

    characterPosition() {
        this.character_pos = {
            XL: this.character.getBoundingClientRect().left,
            XR: this.character.getBoundingClientRect().left + this.character.offsetWidth,
            YT: this.character.getBoundingClientRect().top,
            YB: this.character.getBoundingClientRect().top + this.character.offsetHeight,
        };
    }

    blocksPos() {
        this.block.forEach((block) => {
            this.block_pos = {
                XL: block.getBoundingClientRect().left,
                XR: block.getBoundingClientRect().left + block.offsetWidth,
                YT: block.getBoundingClientRect().top,
                YB: block.getBoundingClientRect().top + block.offsetHeight,
            };
        });
    }

}