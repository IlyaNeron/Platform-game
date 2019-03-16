'use strict';

function GameElements() {
    this.box = document.querySelector('.box');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.fullBackground = document.querySelector('.game-background');
    this.platform = document.querySelector('.game-platform');
    this.platform_fixed = document.querySelector('.platform-fixed');
    this.platform_offset_x = null;
    this.move_state_left = false;
    this.move_state_right = true;
}

GameElements.prototype = {
    init: function () {
        this.coordinates();
        this.events();
        this.disableMoveRight();
        this.disableMoveLeft();
    },

    coordinates: function () {
        this.background.forEach(function (div) {
            this.bgCoordinateX = getComputedStyle(div);
            let matrix = new WebKitCSSMatrix(this.bgCoordinateX.webkitTransform);
            this.bg_offset = matrix.m41;
        }, this);

        this.platformWidth = parseInt(getComputedStyle(this.platform).width, 10);
        this.bgwidth = parseInt(getComputedStyle(this.fullBackground).width, 10);
        console.log('Platform width', this.platformWidth);
        console.log('Background width', this.bgwidth);
    },

    events: function () {
        document.addEventListener('keydown', this.elementsMove.bind(this));
        document.addEventListener('keydown', this.circleMoveUp.bind(this));
    },

    platformMoveRight: function () {
        this.platform_offset_x -= 20;
        this.platform.style.left = this.platform_offset_x + 'px';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 20;
        this.platform.style.left = this.platform_offset_x + 'px';
    },

    circleMoveUp: function (e) {
        if (e.key === 'ArrowUp') {
            let i = 0;

            let interval = setInterval(function () {
                for (i; i <= 100;) {
                    i += 1;
                    document.querySelector('.box').style.top = -i + 'px';
                }
            }, 1000*i);

        }
    },



    elementsMove: function (e) {
        if (this.move_state_right) {

            if (e.key === 'ArrowRight') {
                this.move_state_left = true;
                this.bg_offset -= 2;
                this.background.forEach(function (div) {
                    div.style.transform = 'translate3d(' + this.bg_offset + 'px' + ',' + '0px' + ',' + '0px' + ')';
                }, this);
                this.platformMoveRight();
                this.disableMoveRight();
            }

        }

        if (this.move_state_left) {

            if (e.key === 'ArrowLeft') {
                this.move_state_right = true;
                this.bg_offset += 2;
                this.background.forEach(function (div) {
                    div.style.transform = 'translate3d(' + this.bg_offset + 'px' + ',' + '0px' + ',' + '0px' + ')';
                }, this);
                this.platformMoveLeft();
                this.disableMoveLeft();
            }

        }

    },

    disableMoveLeft: function () {
        if (this.bg_offset === 0 || this.platform_offset_x === 0) {
            console.log('Background offset', this.bg_offset);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_left = false;
        }
    },

    disableMoveRight: function () {
        if (this.bg_offset === this.fullBackground || this.platform_offset_x === -this.platformWidth + 1920) {
            console.log('Background offset', this.bg_offset);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_right = false;
        }
    },

};

let game = new GameElements();
game.init();