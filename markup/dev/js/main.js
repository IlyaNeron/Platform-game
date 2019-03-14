'use strict';

function GameElements() {
    this.box = document.querySelector('.box');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.platform = document.querySelector('.game-platform');
    this.platform_fixed = document.querySelector('.platform-fixed');
    this.platform_offset_x = 100;
    this.platform_offset_y = 0;
    this.move_state_left = true;
    this.move_state_right = true;
}

GameElements.prototype = {
    init: function () {
        this.coordinates();
        this.events();
    },

    coordinates: function (bgCoordinateX, platformWidth, platformLeft) {
        this.background.forEach(function (div) {
            bgCoordinateX = getComputedStyle(div);
            let matrix = new WebKitCSSMatrix(bgCoordinateX.webkitTransform);
            this.bg_offset = matrix.m41;
        }, this);

        platformWidth = getComputedStyle(this.platform).width;
        platformLeft = getComputedStyle(this.platform).left;
        console.log(platformWidth);
        console.log(platformLeft);
    },

    events: function () {
        document.addEventListener('keydown', this.backgroundMove.bind(this));
        document.addEventListener('keydown', this.circleMoveUp.bind(this));
    },

    platformMoveRight: function () {
        this.platform_offset_x += .5;
        this.platform.style.left = -this.platform_offset_x + '%';
    },

    platformMoveLeft: function () {
        this.platform_offset_x -= .5;
        this.platform.style.left = -this.platform_offset_x + '%';
    },

    circleMoveUp: function (e) {
        if (e.key === 'ArrowUp') {
        }
    },

    backgroundMove: function (e) {
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
            console.log(this.bg_offset);
            this.move_state_left = false;
        }
    },

    disableMoveRight: function () {
        if (this.bg_offset === 200 || this.platform_offset_x === 200) {
            console.log(this.bg_offset);
            this.move_state_right = false;
        }
    },

};

let game = new GameElements();
game.init();