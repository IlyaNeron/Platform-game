'use strict';

function GameElements() {
    this.box = document.querySelector('.box');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.fullBackground = document.querySelector('.game-background');
    this.platform = document.querySelector('.game-platform');
    this.platform_offset_x = null;
    this.move_state_left = false;
    this.move_state_right = true;
    this.Int = null;
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
        document.addEventListener('keyup', this.elementsStop.bind(this));
        document.addEventListener('keydown', this.circleMoveUp.bind(this));
    },

    platformMoveRight: function () {
        this.platform_offset_x -= 8;
        this.platform.style.transform = 'translateX(' + this.platform_offset_x + 'px)';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 8;
        this.platform.style.transform = 'translateX(' + this.platform_offset_x + 'px)';
    },

    circleMoveUp: function (e) {
        let state = true;
        let _this = this;
        if (state === true) {
            if (e.key === 'ArrowUp') {
                state = false;
                this.box.classList.add('jump');
                setTimeout(function () {
                    state = true;
                    console.log(state);
                    _this.box.classList.remove('jump');
                }, 1000);
            }
        }
    },

    elementsMove: function (e) {
        if (!this.Int) {
            let _this = this;
            this.Int = setInterval(function () {

                if (_this.move_state_right) {

                    if (e.key === 'ArrowRight') {
                        _this.move_state_left = true;
                        _this.bg_offset -= 2;
                        _this.background.forEach(function (div) {
                            div.style.transform = 'translate3d(' + this.bg_offset + 'px' + ',' + '0px' + ',' + '0px' + ')';
                        }, _this);
                        _this.platformMoveRight();
                        _this.disableMoveRight();
                    }

                }

                if (_this.move_state_left) {

                    if (e.key === 'ArrowLeft') {
                        _this.move_state_right = true;
                        _this.bg_offset += 2;
                        _this.background.forEach(function (div) {
                            div.style.transform = 'translate3d(' + this.bg_offset + 'px' + ',' + '0px' + ',' + '0px' + ')';
                        }, _this);
                        _this.platformMoveLeft();
                        _this.disableMoveLeft();
                    }

                }
            },50);

        }

    },

    elementsStop: function (e) {
        if (this.Int) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                console.log("STOP");
                clearInterval(this.Int);
                this.Int = null;
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
        if (this.bg_offset === (this.bgwidth - screen.width)*-1 || this.platform_offset_x === (this.platformWidth - screen.width)*-1) {
            console.log(screen.width);
            console.log('Background offset', this.bg_offset);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_right = false;
        }
    },

};

let game = new GameElements();
game.init();