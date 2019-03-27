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
    this.jump_value = -120;
}

GameElements.prototype = {
    init: function () {
        this.elementsValue();
        this.events();
        this.inputs();
        this.disableMoveRight();
        this.disableMoveLeft();
        this.backgroundMoveRight();
        this.backgroundMoveLeft();
    },

    elementsValue: function () {
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

            requestAnimationFrame(inputs);
        };

    },

    jumpAnimationStart: function (e) {
        let _this = this;

        if (this.arrow_up_delay === 0) {

            if (e.key === 'ArrowUp') {
                this.arrow_up_delay = this.time_event;
                this.character.style.transform = 'translateY(' + (this.character_position + this.jump_value) + 'px)';
                setTimeout(function () {
                    _this.character.style.transform = 'translateY(' + _this.character_position + 'px)';
                    setTimeout(function () {
                        _this.arrow_up_delay = 0;
                    }, _this.time_event)

                }, _this.time_event);

            }

        }

    },

    elementsCatch: function () {
        let character_X = this.character.getBoundingClientRect().left;
        let character_Y = this.character.getBoundingClientRect().top;
        let test_object_X = this.test_object.getBoundingClientRect().left;
        let test_object_Y = this.test_object.getBoundingClientRect().top;
        let character_W = this.character.clientWidth;
        let character_H = this.character.clientHeight;
        let test_object_W = this.test_object.clientWidth;
        let test_object_H = this.test_object.clientHeight;
        let YColl = false;
        let XColl = false;
        let _this = this;

        if ((character_X + character_W >= test_object_X) && (character_X <= test_object_X + test_object_W)) {
            console.log('Character Coordinate X', character_X + character_W);
            console.log('Test object Coordinate X', test_object_X);

            if (character_Y + character_H >= test_object_Y) {
                this.jump_value = test_object_Y - (character_Y - character_H);
                console.log('under');
            }

            if (character_Y + character_H <= test_object_Y) {
                console.log('top');
                this.character_position = -100;
                this.jump_value = -120;
                console.log(this.jump_value);
                console.log(this.character_position);
            }

        }

        if ((character_X + character_W <= test_object_X) || (character_X >= test_object_X + test_object_W)) {
            console.log('out');
            this.jump_value = -120;
        }

        if ((character_X + character_W) >= test_object_X) {
            if ((character_Y <= test_object_Y + test_object_H) || (character_Y + character_H <= test_object_Y)) {
            }
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
        this.platform_offset_x -= 0.5;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 0.5;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveRight: function () {
      this.level_offset_x -= 0.5;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveLeft: function () {
      this.level_offset_x += 0.5;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

};

let game = new GameElements();
game.init();

