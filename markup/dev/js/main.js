'use strict';

function GameElements() {
    this.character = document.querySelector('.character');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.fullBackground = document.querySelector('.game-background');
    this.platform = document.querySelector('.game-platform');
    this.level_objects = document.querySelector('.game-level-objects');
    this.test_object = document.querySelector('.test-floor');
    this.platform_offset_x = null;
    this.level_offset_x = null;
    this.bg_offset_x = null;
    this.move_state_left = false;
    this.move_state_right = true;
    this.key_state = {};
    this.arrow_up_delay = 0;
    this.time_event = 300;
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
            this.bg_offset_x = matrix.m41;
        }, this);

        this.platformWidth = parseInt(getComputedStyle(this.platform).width, 10);
        this.bgwidth = parseInt(getComputedStyle(this.fullBackground).width, 10);
        console.log('Platform width', this.platformWidth);
        console.log('Background width', this.bgwidth);
    },

    events: function () {
        let _this = this;

        document.addEventListener('keydown', this.jumpAnimationStart.bind(this));

        document.addEventListener('keydown', function (e) {
            _this.key_state[e.key] = true;
        });

        document.addEventListener('keyup', function (e) {
            _this.key_state[e.key] = false;
        });

        this.inputs = function inputs() {
            if (_this.key_state['ArrowRight']) {
                _this.elementsMoveRight();
            }

            if (_this.key_state['ArrowLeft']) {
                _this.elementsMoveLeft();
            }

            setTimeout(inputs, 50);
        };

    },

    jumpAnimationStart: function (e) {
        let _this = this;

        if (this.arrow_up_delay === 0) {

            if (e.key === 'ArrowUp') {
                this.arrow_up_delay = this.time_event;
                this.character.classList.add('jump');

                setTimeout(function () {
                    console.log('2');
                    _this.character.classList.remove('jump');

                    setTimeout(function () {
                        _this.arrow_up_delay = 0;
                    }, _this.time_event)

                }, _this.time_event);

            }

        }
    },

    elementsCatch: function () {
        // this.test_object.getBoundingClientRect();
        // console.log( this.test_object.getBoundingClientRect().top);
        // console.log( this.character.getBoundingClientRect().top + 40);
        //
        // if ((this.character.getBoundingClientRect().top) + 40 >= this.test_object.getBoundingClientRect().top) {
        //
        // }
    },

    elementsMoveRight: function () {

        if (this.move_state_right) {

            this.move_state_left = true;
            this.backgroundMoveRight();
            this.platformMoveRight();
            this.levelMoveRight();
            this.disableMoveRight();
            this.elementsCatch();
        }

    },

    elementsMoveLeft: function () {

        if (this.move_state_left) {

            this.move_state_right = true;
            this.backgroundMoveLeft();
            this.platformMoveLeft();
            this.levelMoveLeft();
            this.disableMoveLeft();

        }

    },

    disableMoveLeft: function () {
        if (this.bg_offset_x === 0 || this.platform_offset_x === 0) {
            console.log('Background offset', this.bg_offset_x);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_left = false;
        }
    },

    disableMoveRight: function () {
        if (this.bg_offset_x === (this.bgwidth - screen.width)*-1 || this.platform_offset_x === (this.platformWidth - screen.width)*-1) {
            console.log(screen.width);
            console.log('Background offset', this.bg_offset_x);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_right = false;
        }
    },

    backgroundMoveRight: function () {
        this.bg_offset_x -= 2;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    backgroundMoveLeft: function () {
        this.bg_offset_x += 2;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    platformMoveRight: function () {
        this.platform_offset_x -= 15;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 15;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveRight: function () {
      this.level_offset_x -= 15;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveLeft: function () {
      this.level_offset_x += 15;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

};

let game = new GameElements();
game.init();

