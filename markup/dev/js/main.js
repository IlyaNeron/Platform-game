'use strict';

function GameElements() {
    this.character = document.querySelector('.character');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.fullBackground = document.querySelector('.game-background');
    this.platform = document.querySelector('.game-platform');
    this.level_objects = document.querySelector('.game-level-objects');
    this.test_object = document.querySelector('.test-object');
    this.platform_offset_x = null;
    this.level_offset_x = null;
    this.bg_offset_x = null;
    this.move_state_left = false;
    this.move_state_right = true;
    this.key_state = {};
    this.arrow_up_delay = 0;
    this.time_event = 300;
    this.character_position = 0;
    this.default_jump_value = -120;
    this.jump_value = this.default_jump_value;
}

GameElements.prototype = {
    init: function () {
        this.coordinates();
        this.events();
        this.inputs();
        this.disableMoveRight();
        this.disableMoveLeft();
        this.backgroundMoveRight();
        this.backgroundMoveLeft();
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

            setTimeout(inputs, 10);
        };

    },

    jumpAnimationStart: function (e) {
        let _this = this;

        if (this.arrow_up_delay === 0) {

            if (e.key === 'ArrowUp') {
                this.arrow_up_delay = this.time_event;
                this.character.style.transform = 'translateY(' + this.jump_value +'px)';
                setTimeout(function () {
                    _this.character.style.transform = 'translateY(' + _this.character_position +'px)';
                    setTimeout(function () {
                        _this.arrow_up_delay = 0;
                    }, _this.time_event)

                }, _this.time_event);

            }

        }

    },

    elementsCatch: function () {
        this.test_object.getBoundingClientRect();
        let test_object_XL = this.test_object.getBoundingClientRect().left;
        let test_object_XR = this.test_object.getBoundingClientRect().right;
        let test_object_YT = this.test_object.getBoundingClientRect().top;
        let test_object_YB = this.test_object.getBoundingClientRect().bottom;
        let character_XL = this.character.getBoundingClientRect().left;
        let character_XR = this.character.getBoundingClientRect().right;
        let character_YT = this.character.getBoundingClientRect().top;
        let character_YB = this.character.getBoundingClientRect().bottom;

        console.log('Character Y Top', character_YT + pageXOffset);
        console.log('Character Y Bottom', character_YB + pageXOffset);
        console.log('Character X Left', character_XL + pageXOffset);
        console.log('Character X Right',character_XR + pageXOffset);
        console.log('Test object Y Top', test_object_YT + pageXOffset);
        console.log('Test object Y Bottom', test_object_YB + pageXOffset);
        console.log('Test object X Left', test_object_XL + pageXOffset);
        console.log('Test object X Right', test_object_XR + pageXOffset);


        if (test_object_XL < character_XR && test_object_XR > character_XL) {
            console.log('catch');
            this.jump_value = test_object_YB - character_YT;
        }

        if (test_object_YT >= character_YB) {
            this.character_position = -100;
            this.jump_value = this.default_jump_value + this.character_position;
            console.log(this.character_position);
            console.log('catch top');
        }

        if (test_object_XL > character_XR || test_object_XR < character_XL) {
            this.jump_value = this.default_jump_value;
            this.character_position = 0;
            console.log('out');
        }


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
            this.elementsCatch();

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
        this.bg_offset_x -= 0.5;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    backgroundMoveLeft: function () {
        this.bg_offset_x += 0.5;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    platformMoveRight: function () {
        this.platform_offset_x -= 1;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 1;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveRight: function () {
      this.level_offset_x -= 1;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveLeft: function () {
      this.level_offset_x += 1;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

};

let game = new GameElements();
game.init();

