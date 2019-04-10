import {CharacterMove} from './character-move';

export class Collision extends CharacterMove {
    constructor() {
        super();
    }

    playerCoordinates() {
        this.playerCoord = {
            XL: Math.round(this.htmlElem.getBoundingClientRect().left),
            XR: Math.round(this.htmlElem.getBoundingClientRect().left + this.objectSize.width),
            YT: Math.round(this.htmlElem.getBoundingClientRect().top),
            YB: Math.round(this.htmlElem.getBoundingClientRect().top + this.objectSize.height),
        };
    }

    blocksCoordinates() {
        this.blocks = Array.from(document.querySelectorAll('.block'));
        this.blocks.forEach((block) => {
            this.blocksCoord = {
                XL: Math.round(block.getBoundingClientRect().left),
                XR: Math.round(block.getBoundingClientRect().left + this.objectSize.width),
                YT: Math.round(block.getBoundingClientRect().top),
                YB: Math.round(block.getBoundingClientRect().top + this.objectSize.height),
            };

            this.detecting();
        });
    }



    detecting() {
        if ((this.playerCoord.XR >= this.blocksCoord.XL) && (this.playerCoord.XL <= this.blocksCoord.XR)) {
            if (this.playerCoord.YT > this.blocksCoord.YB) {
                console.log('under block');
                this.properties.offset_y = 0;
                this.jump.landing = true;
                this.jump.jumping = false;
            }

            if (this.playerCoord.YB <= this.blocksCoord.YT) {
                console.log('top block');
                console.log(this.properties.offset_y);
                console.log(this.properties.position);
            }
        }

        if (this.playerCoord.YT >= this.blocksCoord.YB) {

            if ((this.playerCoord.XR <= this.blocksCoord.XL) || (this.playerCoord.XL > this.blocksCoord.XR)) {
               // console.log('out');
            }

        }

    }

}