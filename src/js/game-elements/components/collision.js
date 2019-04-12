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
            X: this.properties.offset_x,
            Y: this.properties.offset_y,
        };
    }

    blocksCoordinates() {
        this.blocksArray = Array.from(document.querySelectorAll('.block'));
        for (let i = 0; i < this.blocksArray.length; i++) {
            let blockId = this.blocksArray[i];

            this.blocksCoord = {
                XL: Math.round(blockId.getBoundingClientRect().left),
                XR: Math.round(blockId.getBoundingClientRect().left + this.objectSize.width),
                YT: Math.round(blockId.getBoundingClientRect().top),
                YB: Math.round(blockId.getBoundingClientRect().top + this.objectSize.height),
            };

            this.dir = this.colCheck(this.playerCoord, this.blocksCoord);

            if (this.dir === 'left' || this.dir === 'right') {
                this.properties.positionX = 0;
                this.jump.jumping = false;
                console.log(this.dir);
            } else if (this.dir === 'bottom') {
                this.jump.jumping = false;
                this.jump.landing = true;
            } else if (this.dir === 'top') {
                this.properties.positionY *= -1;
            }
        }
    }

    colCheck(Player, Block) {
        let vectorX = (Player.XL + (this.objectSize.width / 2)) - (Block.XL + (this.objectSize.width / 2));
        let vectorY = (Player.YT + (this.objectSize.height / 2)) - (Block.YT + (this.objectSize.height / 2));
        let halfWidth = (this.objectSize.width / 2) + (this.objectSize.width / 2);
        let halfHeight = (this.objectSize.height / 2) + (this.objectSize.height / 2);
        let colDir = null;

        if (Math.abs(vectorX) < halfWidth && Math.abs(vectorY) < halfHeight) {
            let outX = halfWidth - Math.abs(vectorX);
            let outY = halfHeight - Math.abs(vectorY);
            console.log(outX, outY);

            if (outX >= 0) {
                if (outY - outX <= 30 && outY - outX >= 28) {
                    
                    alert('sdf');
                }
                //console.log('touch');
            }
        }




        return this.colDir;
    }
}