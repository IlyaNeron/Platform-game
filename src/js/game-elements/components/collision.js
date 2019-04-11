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
                this.jump.jumping = false;
            } else if (this.dir === 'bottom') {
                this.jump.jumping = false;
                this.jump.landing = true;
            } else if (this.dir === 'top') {
                this.properties.positionY = 0;
            }
        }
    }

    colCheck(Player, Block) {
        let vectorX = (Player.XL + (this.objectSize.width / 2)) - (Block.XL + (this.objectSize.width / 2));
        let vectorY = (Player.YT + (this.objectSize.height / 2)) - (Block.YT + (this.objectSize.height / 2));

        const hWidths = (this.objectSize.width / 2) + (this.objectSize.width / 2);
        const hHeights = (this.objectSize.height / 2) + (this.objectSize.height / 2);
        this.colDir = null;

        if (Math.abs(vectorX) < hWidths && Math.abs(vectorY) < hHeights) {
            let outX = hWidths - Math.abs(vectorX);
            let outY = hHeights - Math.abs(vectorY);

            if (outX >= outY) {
                if (vectorY > 0) {
                    this.colDir = 'top';
                    console.log('top');
                    Player.Y += outY;
                } else {
                    this.colDir = 'bottom';
                    Player.Y -= outY;
                    console.log('bottom');
                }
            } else {
                if (vectorX > 0) {
                    this.colDir = 'left';
                    Player.X += outX;
                    console.log('left');
                } else {
                    this.colDir = 'right';
                    Player.X -= outX;
                    console.log('right');
                }
            }
        }
        return this.colDir;
    }
}