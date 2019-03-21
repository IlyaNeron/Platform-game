'use strict';

function GameElements() {
    this.box = document.querySelector('.box');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.fullBackground = document.querySelector('.game-background');
    this.platform = document.querySelector('.game-platform');
    this.platform_offset_x = null;
    this.move_state_left = false;
    this.move_state_right = true;
    this.key_state = {};
}

GameElements.prototype = {
    init: function () {
        this.coordinates();
        this.events();
        this.inputs();
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
        let _this = this;
        document.addEventListener('keydown', function (e) {
            _this.key_state[e.key] = true;
        }, true);

        document.addEventListener('keyup', function (e) {
            _this.key_state[e.key] = false;
        }, true);

        this.inputs = function inputs() {
            if (_this.key_state['ArrowRight']) {
                _this.elementsMoveRight();
            }

            if (_this.key_state['ArrowLeft']) {
                _this.elementsMoveLeft();
            }

            if (_this.key_state['ArrowUp']) {
                _this.circleMoveUp();
            }

            setTimeout(inputs, 50);
        }

    },

    circleMoveUp: function () {
        let _this = this;
        _this.box.classList.add('jump');
        setTimeout(function () {
            _this.box.classList.remove('jump');
        }, 1000);
    },

    elementsMoveRight: function () {

        if (this.move_state_right) {

            this.move_state_left = true;
            this.backgroundMoveRight();
            this.platformMoveRight();
            this.disableMoveRight();
        }

    },

    elementsMoveLeft: function () {

        if (this.move_state_left) {

            this.move_state_right = true;
            this.backgroundMoveLeft();
            this.platformMoveLeft();
            this.disableMoveLeft();

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

    backgroundMoveRight: function () {
        this.bg_offset -= 2;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    backgroundMoveLeft: function () {
        this.bg_offset += 2;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    platformMoveRight: function () {
        this.platform_offset_x -= 15;
        this.platform.style.transform = 'translateX(' + this.platform_offset_x + 'px)';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 15;
        this.platform.style.transform = 'translateX(' + this.platform_offset_x + 'px)';
    },

};

let game = new GameElements();
game.init();

