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
            X: this.character_properties.offset_x,
            Y: this.character_properties.offset_y,
        };
    }

    blocksCoordinates() {
        this.blocksArray = Array.from(document.querySelectorAll('.block'));

        for (let i = 0; i < this.blocksArray.length; i++) {
            let blockId = this.blocksArray[i];

            const style = getComputedStyle(blockId);
            const matrix = new WebKitCSSMatrix(style.webkitTransform);

            this.blocksCoord = {
                XL: Math.round(blockId.getBoundingClientRect().left),
                XR: Math.round(blockId.getBoundingClientRect().left + this.objectSize.width),
                YT: Math.round(blockId.getBoundingClientRect().top),
                YB: Math.round(blockId.getBoundingClientRect().top + this.objectSize.height),
                X: matrix.m41,
                Y: matrix.m42,
            };

            this.dir = this.colCheck(this.playerCoord, this.blocksCoord);

            if (this.dir === 'left' || this.dir === 'right') {
                this.character_properties.positionX = 0;
                this.jump.jumping = false;
            } else if (this.dir === 'bottom') {
                this.jump.landing = true;
                this.jump.jumping = false;
            } else if (this.dir === 'top') {
                this.character_properties.positionY *= -1;
            }
        }
    }

    colCheck(Player, Block) {
        let vectorX = (Player.X + (this.objectSize.width / 2)) - (Block.X + (this.objectSize.width / 2));
        let vectorY = (Player.Y + (this.objectSize.height / 2)) - (Block.Y + (this.objectSize.height / 2));
        let halfWidth = (this.objectSize.width / 2) + (this.objectSize.width / 2);
        let halfHeight = (this.objectSize.height / 2) + (this.objectSize.height / 2);
        let colDir = null;

        if (Math.abs(vectorX) < halfWidth && Math.abs(vectorY) < halfHeight) {
            let outX = halfWidth - Math.abs(vectorX);
            let outY = halfHeight - Math.abs(vectorY);

            if (outX >= outY) {
                if (vectorY > 0) {
                    console.log('top');
                    colDir = 'top';
                    Player.Y += outY;
                } else {
                    console.log('bottom');
                    colDir = 'bottom';
                    Player.Y -= outY;
                }
            } else {
                if (vectorX > 0) {
                    console.log('left');
                    colDir = 'left';
                    Player.X += outX;
                } else {
                    console.log('right');
                    colDir = 'right';
                    Player.X -= outX;
                }
            }
        }
        return colDir;
    }
}